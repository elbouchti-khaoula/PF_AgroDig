package com.agrodig.blogservice.service;

import com.agrodig.blogservice.dto.request.BlogRequestDto;
import com.agrodig.blogservice.dto.request.CommentRequestDto;
import com.agrodig.blogservice.dto.request.VoteRequestDto;
import com.agrodig.blogservice.dto.response.*;
import com.agrodig.blogservice.mapper.EntityToDto;
import com.agrodig.blogservice.model.Blog;
import com.agrodig.blogservice.model.Comment;
import com.agrodig.blogservice.model.Vote;
import com.agrodig.blogservice.repository.BlogRepository;
import com.agrodig.blogservice.repository.CommentRepository;
import com.agrodig.blogservice.repository.TagRepository;
import com.agrodig.blogservice.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
@Slf4j
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;
    private final CommentRepository commentRepository;
    private final VoteRepository voteRepository;
    private final TagRepository tagRepository;

    private final AttachementService attachementService;

    private final WebClient.Builder webClientBuilder;


    public List<BlogResponseDto> getAllBlogs() {
        //get users for all blogs from users service
        List<Blog> blogs = blogRepository.findAll();
        UserResponseDto[] userResponseDtos = webClientBuilder.build().get()
                .uri("http://users-service/api/user",
                        uriBuilder -> uriBuilder.queryParam("id", blogs.stream().map(Blog::getPosterId).collect(Collectors.toList())).build())
                .retrieve()
                .bodyToMono(UserResponseDto[].class)
                .block();
        //count up votes down votes comments
        log.info("User {} is retrieved", userResponseDtos.length);
        return blogs.stream().map(blog -> EntityToDto.blogToBlogResponseDto(blog, Arrays
                        .stream(userResponseDtos)
                        .filter(userResponseDto -> userResponseDto.getId() == blog.getPosterId()).findFirst().get()))
                .collect(Collectors.toList());
    }

    public List<BlogResponseDto> getMyBlogs(UserResponseDto userResponseDto) {
        //get blogs for user
        return blogRepository
                .findByPosterId(userResponseDto.getId())
                .stream()
                .map(blog -> EntityToDto.blogToBlogResponseDto(blog, userResponseDto))
                .collect(Collectors.toList());

    }

    public List<CommentResponseDto> getCommentsByBlog(Long blogId) {
        List<Comment> comments = commentRepository.findByBlog_Id(blogId);

        UserResponseDto[] userResponseDtos = webClientBuilder.build().get()
                .uri("http://users-service/api/user",
                        uriBuilder -> uriBuilder.queryParam("id", comments.stream().map(Comment::getCommenterId).collect(Collectors.toList())).build())
                .retrieve()
                .bodyToMono(UserResponseDto[].class)
                .block();


        return comments
                .stream()
                .map(comment -> EntityToDto.commentToCommentResponseDto(comment, Arrays
                        .stream(userResponseDtos)
                        .filter(userResponseDto -> userResponseDto.getId() == comment.getCommenterId()).findFirst().get()))
                .collect(Collectors.toList());
    }

    public List<VoteResponseDto> getVotesByBlog(Long blogId) {
        List<Vote> votes = voteRepository.findByBlog_Id(blogId);
        //fetch users
        UserResponseDto[] userResponseDtos = webClientBuilder.build().get()
                .uri("http://users-service/api/user",
                        uriBuilder -> uriBuilder.queryParam("id", votes.stream().map(Vote::getVoterId).collect(Collectors.toList())).build())
                .retrieve()
                .bodyToMono(UserResponseDto[].class)
                .block();

        return votes
                .stream()
                .map(vote -> EntityToDto.VoteToVoteResponseDto(vote, Arrays
                        .stream(userResponseDtos)
                        .filter(userResponseDto -> userResponseDto.getId() == vote.getVoterId()).findFirst().get()))
                .collect(Collectors.toList());

    }

    public List<VoteResponseDto> getVotesByComment(Long commentId) {
        List<Vote> votes = voteRepository.findByComment_Id(commentId);
        // find the voter
        UserResponseDto[] userResponseDtos = webClientBuilder.build().get()
                .uri("http://users-service/api/user",
                        uriBuilder -> uriBuilder.queryParam("id", votes.stream().map(Vote::getVoterId).collect(Collectors.toList())).build())
                .retrieve()
                .bodyToMono(UserResponseDto[].class)
                .block();

        return votes.stream().map(vote -> EntityToDto.VoteToVoteResponseDto(vote, Arrays
                .stream(userResponseDtos)
                .filter(userResponseDto -> userResponseDto.getId() == vote.getVoterId())
                .findFirst()
                .get())).collect(Collectors.toList());
    }

    public void createBlog(BlogRequestDto blogRequestDto) {
        Blog blog = new Blog();
        blog.setBody(blogRequestDto.getBody());
        blog.setTitle(blogRequestDto.getTitle());
        if (blogRequestDto.getTagIds() != null) blog.setTags(tagRepository.findAllById(blogRequestDto.getTagIds()));
        blog.setCreationDate(new Date());
        blog.setLastActivityDate(new Date());
        blog.setViewCount(0);
        blog.setPosterId(blogRequestDto.getUserId());

        //saving the attached files
        if (blogRequestDto.getAttachements() != null)
            blogRequestDto.getAttachements().stream().map(multipartFile -> attachementService.addAttachementToBlog(multipartFile, blog)).collect(Collectors.toList());
        //attachementService.addAttachementToBlog(blogRequestDto.getAttachements(),blog);
        blogRepository.save(blog);
    }

  /*  public UserResponseDto getLoggedInUser(){
        UserResponseDto userResponseDto = webClientBuilder.build().get()
                .uri("http://users-service/api/user/profile")
                .retrieve()
                .bodyToMono(UserResponseDto.class)
                .block();
        return  userResponseDto;
    }*/

    public void commentBlog(Long blogId, CommentRequestDto commentRequestDto) {
        Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new IllegalStateException("Blog not found"));
        //create and save comment

        Comment comment = new Comment();
        comment.setCommenterId(commentRequestDto.getUserResponseDto().getId());
        comment.setBody(commentRequestDto.getBody());
        comment.setCreationDate(new Date());
        //associate comment to blog
        comment.setBlog(blog);

        commentRepository.save(comment);
    }

    public void voteBlog(Long blogId, VoteRequestDto voteRequestDto) {
        Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new IllegalStateException("Blog not found"));

        UserResponseDto[] userResponseDtos = webClientBuilder.build().get()
                .uri("http://users-service/api/user",
                        uriBuilder -> uriBuilder.queryParam("id", Collections.singletonList(voteRequestDto.getUserId())).build())
                .retrieve()
                .bodyToMono(UserResponseDto[].class)
                .block();



        //create and save vote

        Vote vote = new Vote();
        vote.setVoterId(voteRequestDto.getUserId());
        vote.setCreationDate(new Date());
        vote.setIsPositive(voteRequestDto.getIsPositive());
        vote.setIsByExpert(userResponseDtos[0].getRole() == "EXPERT" );


        vote.setBlog(blog);

        voteRepository.save(vote);
    }

    public void deleteBlog(Long blogId) {
        Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new IllegalStateException("Blog not found"));

        //delete blog attachements from file system
        blog.getAttachements().stream().map(attachement -> attachementService.deleteAttachement(attachement)).collect(Collectors.toList());

        blogRepository.delete(blog);
    }

    public void updateBlog(BlogRequestDto blogRequestDto, Long blogId) {
        Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new IllegalStateException("Blog not found"));

        blog.setBody(blogRequestDto.getBody());
        blog.setTitle(blogRequestDto.getTitle());

        //files deletion and creation
        if (blogRequestDto.getAttachements() != null) {
            blog.getAttachements().stream().map(attachement -> attachementService.deleteAttachement(attachement)).collect(Collectors.toList());
            blogRequestDto.getAttachements().stream().map(multipartFile -> attachementService.addAttachementToBlog(multipartFile, blog)).collect(Collectors.toList());
        }
        blog.setLastActivityDate(new Date());
        if (blogRequestDto.getTagIds() != null) blog.setTags(tagRepository.findAllById(blogRequestDto.getTagIds()));

    }

    public void voteComment(Long commentId, VoteRequestDto voteRequestDto) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new IllegalStateException("Comment not found"));
        //create and save vote

        Vote vote = new Vote();
        vote.setVoterId(voteRequestDto.getUserId());
        vote.setCreationDate(new Date());
        vote.setIsPositive(voteRequestDto.getIsPositive());

        vote.setComment(comment);

        voteRepository.save(vote);
    }

    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalStateException("Comment not found"));

        // delete attached files
        comment.getAttachements().stream().map(attachement -> attachementService.deleteAttachement(attachement)).collect(Collectors.toList());

        commentRepository.delete(comment);
    }


    public void updateComment(Long commentId, CommentRequestDto commentRequestDto) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalStateException("Comment not found"));

        comment.setBody(commentRequestDto.getBody());
        comment.setUpdateDate(new Date());

        //deletion and creation of files
        if (commentRequestDto.getFiles() != null) {
            comment.getAttachements().stream().map(attachement -> attachementService.deleteAttachement(attachement)).collect(Collectors.toList());
            commentRequestDto.getFiles().stream().map(multipartFile -> attachementService. addAttachementToComment(multipartFile,comment)).collect(Collectors.toList());
        }

    }

    public void upload(MultipartFile multipartFile) {
        Blog blog = new Blog();
        blogRepository.save(blog);
        attachementService.addAttachementToBlog(multipartFile, blog);
    }

    public List<TagResponseDto> getTagsByBlog(Long postId) {
        Blog blog = blogRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("Blog not found"));

        return   blog.getTags().stream().map(EntityToDto::tagToTagResponseDto).collect(Collectors.toList());
    }
}