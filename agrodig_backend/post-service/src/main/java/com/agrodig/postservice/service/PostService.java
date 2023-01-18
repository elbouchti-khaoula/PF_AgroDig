package com.agrodig.postservice.service;

import com.agrodig.postservice.dto.request.CommentRequestDto;
import com.agrodig.postservice.dto.request.PostRequestDto;
import com.agrodig.postservice.dto.request.TagRequestDto;
import com.agrodig.postservice.dto.request.VoteRequestDto;
import com.agrodig.postservice.dto.response.*;
import com.agrodig.postservice.mapper.EntityToDto;
import com.agrodig.postservice.model.Comment;
import com.agrodig.postservice.model.Post;
import com.agrodig.postservice.model.Tag;
import com.agrodig.postservice.model.Vote;
import com.agrodig.postservice.repository.CommentRepository;
import com.agrodig.postservice.repository.PostRepository;
import com.agrodig.postservice.repository.TagRepository;
import com.agrodig.postservice.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
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
public class PostService {
    private final PostRepository postRepository;
    private final TagRepository tagRepository;

    private final VoteRepository voteRepository;


    private final FileService fileService;
    private final CommentRepository commentRepository;

    private final WebClient.Builder webClientBuilder;

    public void createPost(PostRequestDto postRequestDto) {
        List<Tag> tags = tagRepository.findByIdIn(postRequestDto.getTagIds());

        Post post = new Post();
        post.setBody(postRequestDto.getBody());
        post.setTitle(postRequestDto.getTitle());
        post.setCreatedAt(Instant.now());
        post.setUpdatedAt(Instant.now());
        post.setViewCount(0);
        post.setTags(tags);
        post.setPosterId(postRequestDto.getUserId());

        if (postRequestDto.getFiles() != null)
            postRequestDto.getFiles().stream().map(multipartFile -> fileService.addFileToPost(multipartFile, post)).collect(Collectors.toList());

        postRepository.save(post);
    }

    // Delete post
    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("Post not found"));

        // delete attached files
        post.getFiles().stream().map(file -> fileService.deleteFileOfPost(file)).collect(Collectors.toList());

        postRepository.delete(post);
    }

    public void updatePost(Long postId, PostRequestDto postRequestDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("Post not found"));

        post.setBody(postRequestDto.getBody());
        post.setTitle(postRequestDto.getTitle());

        //deletion and creation of files
        if (postRequestDto.getFiles() != null) {
            post.getFiles().stream().map(file -> fileService.deleteFileOfPost(file)).collect(Collectors.toList());
            postRequestDto.getFiles().stream().map(multipartFile -> fileService.addFileToPost(multipartFile, post)).collect(Collectors.toList());
        }

        post.setUpdatedAt(Instant.now());
        if (postRequestDto.getTagIds() != null) post.setTags(tagRepository.findAllById(postRequestDto.getTagIds()));


    }

    public List<PostResponseDto> getAllPosts() {
        //get users for all blogs from users service
        List<Post> posts = postRepository.findAll();
        UserResponseDto[] userResponseDtos = webClientBuilder.build().get()
                .uri("http://users-service/api/user",
                        uriBuilder -> uriBuilder.queryParam("id", posts.stream().map(Post::getPosterId).collect(Collectors.toList())).build())
                .retrieve()
                .bodyToMono(UserResponseDto[].class)
                .block();

        //count up votes down votes comments
        log.info("User {} is retrieved", userResponseDtos.length);
        return posts.stream().map(post -> EntityToDto.postToPostResponseDto(post, Arrays
                        .stream(userResponseDtos)
                        .filter(userResponseDto -> userResponseDto.getId() == post.getPosterId()).findFirst().get()))
                .collect(Collectors.toList());
    }


    public List<PostResponseDto> getPostsByUser(UserResponseDto userResponseDto) {
        //get blogs for user
        return postRepository
                .findByPosterId(userResponseDto.getId())
                .stream()
                .map(blog -> EntityToDto.postToPostResponseDto(blog, userResponseDto))
                .collect(Collectors.toList());

    }

    public List<CommentResponseDto> getCommentsByPost(Long postId) {
        List<Comment> comments = commentRepository.findByPost_Id(postId);

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

    public List<VoteResponseDto> getVotesByPost(Long postId) {
        List<Vote> votes = voteRepository.findByPost_Id(postId);
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

    public void voteComment(Long commentId, VoteRequestDto voteRequestDto) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new IllegalStateException("Comment not found"));
        //create and save vote

        Vote vote = new Vote() ;
        vote.setVoterId(voteRequestDto.getUserId());
        vote.setCreatedAt(Instant.now());
        vote.setIsPositive(voteRequestDto.getIsPositive());

        vote.setComment(comment);

        voteRepository.save(vote);
    }

    public void votePost(Long postId, VoteRequestDto voteRequestDto) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalStateException("Post not found"));

        UserResponseDto[] userResponseDtos = webClientBuilder.build().get()
                .uri("http://users-service/api/user",
                        uriBuilder -> uriBuilder.queryParam("id", Collections.singletonList(voteRequestDto.getUserId())).build())
                .retrieve()
                .bodyToMono(UserResponseDto[].class)
                .block();

        //create and save vote
        Vote vote = new Vote();
        vote.setVoterId(voteRequestDto.getUserId());
        vote.setCreatedAt(Instant.now());
        vote.setIsPositive(voteRequestDto.getIsPositive());
        vote.setIsByExpert(userResponseDtos[0].getRole() == "EXPERT" );

        vote.setPost(post);

        voteRepository.save(vote);
    }

    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalStateException("Comment not found"));

        // delete attached files
        comment.getFiles().stream().map(file -> fileService.deleteFileOfPost(file)).collect(Collectors.toList());

        commentRepository.delete(comment);
    }


    public void updateComment(Long commentId, CommentRequestDto commentRequestDto) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalStateException("Comment not found"));

        comment.setBody(commentRequestDto.getBody());
        comment.setUpdatedAt(Instant.now());

        //deletion and creation of files
        if (commentRequestDto.getFiles() != null) {
            comment.getFiles().stream().map(file -> fileService.deleteFileOfPost(file)).collect(Collectors.toList());
            commentRequestDto.getFiles().stream().map(multipartFile -> fileService.addFileToComment(multipartFile,comment)).collect(Collectors.toList());
        }

    }

    public List<TagResponseDto> getTagsByPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("Post not found"));

        return post.getTags().stream().map(EntityToDto::tagToTagResponseDto).collect(Collectors.toList());
    }

    public PostResponseDto getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("Post not found"));

        UserResponseDto[] userResponseDtos = webClientBuilder.build().get()
                .uri("http://users-service/api/user",
                        uriBuilder -> uriBuilder.queryParam("id",Collections.singletonList(post.getPosterId())).build())
                .retrieve()
                .bodyToMono(UserResponseDto[].class)
                .block();

        return EntityToDto.postToPostResponseDto(post, userResponseDtos[0]);

    }

  /*  public void addTagToPost(Long postId, TagRequestDto tagRequestDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("Post not found"));

    }*/
}
