package com.agrodig.blogservice.service;

import com.agrodig.blogservice.dto.request.BlogRequestDto;
import com.agrodig.blogservice.dto.request.CommentRequestDto;
import com.agrodig.blogservice.dto.request.VoteRequestDto;
import com.agrodig.blogservice.dto.response.*;
import com.agrodig.blogservice.mapper.EntityToDto;
import com.agrodig.blogservice.model.Blog;
import com.agrodig.blogservice.model.Comment;
import com.agrodig.blogservice.model.Tag;
import com.agrodig.blogservice.model.Vote;
import com.agrodig.blogservice.repository.BlogRepository;
import com.agrodig.blogservice.repository.CommentRepository;
import com.agrodig.blogservice.repository.TagRepository;
import com.agrodig.blogservice.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.transaction.Transactional;
import java.util.Arrays;
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
        return blogs.stream().map(blog -> EntityToDto.blogToBlogResponseDto(blog, Arrays
                        .stream(userResponseDtos)
                        .filter(userResponseDto -> userResponseDto.getId() == blog.getPosterId()).findFirst().get()))
                .collect(Collectors.toList());
    }

    public List<BlogResponseDto> getMyBlogs() {
        //get blogs for user
        return blogRepository
                .findByPosterId(getLoggedInUser().getId())
                .stream()
                .map(blog -> EntityToDto.blogToBlogResponseDto(blog, getLoggedInUser()))
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
                .filter(userResponseDto -> userResponseDto.getId()==vote.getVoterId())
                .findFirst()
                .get())).collect(Collectors.toList());
    }

    public void createBlog(BlogRequestDto blogRequestDto) {
        Blog blog = new Blog();
        blog.setBody(blogRequestDto.getBody());
        blog.setTitle(blogRequestDto.getTitle());
        blog.setTags(tagRepository.findAllById(blogRequestDto.getTagIds()));

        blog.setCreationDate(new Date());
        blog.setLastActivityDate(new Date());
        blog.setViewCount(0);
        blog.setPosterId(getLoggedInUser().getId());

        blogRepository.save(blog);
    }

    public UserResponseDto getLoggedInUser(){
        UserResponseDto userResponseDto = webClientBuilder.build().get()
                .uri("http://users-service/api/user/profile")
                .retrieve()
                .bodyToMono(UserResponseDto.class)
                .block();
        return  userResponseDto;
    }

    public void commentBlog(Long blogId, CommentRequestDto commentRequestDto) {
        Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new IllegalStateException("Blog not found"));
        //create and save comment

        Comment comment = new Comment();
        comment.setCommenterId(getLoggedInUser().getId());
        comment.setBody(commentRequestDto.getBody());
        comment.setCreationDate(new Date());
        //associate comment to blog
        comment.setBlog(blog);

        commentRepository.save(comment);
    }

    public void voteBlog(Long blogId, VoteRequestDto voteRequestDto) {
        Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new IllegalStateException("Blog not found"));
        //create and save vote

        Vote vote = new Vote();
        vote.setVoterId(getLoggedInUser().getId());
        vote.setCreationDate(new Date());
        vote.setIsPositive(voteRequestDto.getIsPositive());

        vote.setBlog(blog);

        voteRepository.save(vote);
    }

    public void deleteBlog(Long blogId) {
        Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new IllegalStateException("Blog not found"));
        blogRepository.delete(blog);
    }

    public void updateBlog(BlogRequestDto blogRequestDto) {
        Blog blog = blogRepository.findById(blogRequestDto.getId()).orElseThrow(() -> new IllegalStateException("Blog not found"));
        //create and save comment
        blog.setBody(blogRequestDto.getBody());
        blog.setTitle(blogRequestDto.getTitle());
        blog.setTags(tagRepository.findAllById(blogRequestDto.getTagIds()));

    }
}