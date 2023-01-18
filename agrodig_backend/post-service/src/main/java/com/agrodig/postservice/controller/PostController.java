package com.agrodig.postservice.controller;

import com.agrodig.postservice.dto.request.CommentRequestDto;
import com.agrodig.postservice.dto.request.TagRequestDto;
import com.agrodig.postservice.dto.request.VoteRequestDto;
import com.agrodig.postservice.dto.response.*;
import com.agrodig.postservice.dto.request.PostRequestDto;
import com.agrodig.postservice.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping
    public List<PostResponseDto> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping(path = "/{postId}")
    public PostResponseDto getPostById(@PathVariable Long postId) {
        return postService.getPostById(postId);
    }

    @GetMapping(path = "myPosts")
    public List<PostResponseDto> getPostsByUser(@RequestBody UserResponseDto userResponseDto) {
        return postService.getPostsByUser(userResponseDto);
    }

    @GetMapping(path = "/comments")
    public List<CommentResponseDto> getCommentsByPost(@RequestParam Long postId) {
        return postService.getCommentsByPost(postId);
    }

    @GetMapping(path = "/votes")
    public List<VoteResponseDto> getVotesByPost(@RequestParam Long postId) {
        return postService.getVotesByPost(postId);
    }

    @GetMapping(path = "/tags")
    public List<TagResponseDto> getTagsByPost(@RequestParam Long postId) {
        return postService.getTagsByPost(postId);
    }

  /*  @PostMapping(path = "/tag")
    @ResponseStatus(HttpStatus.CREATED)
    public void addTagToPost(@RequestParam Long postId, @RequestBody TagRequestDto tagRequestDto) {
        postService.addTagToPost(postId, tagRequestDto);
    }*/

    @GetMapping(path = "/comments/votes")
    public List<VoteResponseDto> getVotesByComment(@RequestParam Long commentId) {
        return postService.getVotesByComment(commentId);
    }

    @PostMapping(path = "/comment")
    @ResponseStatus(HttpStatus.CREATED)
    public void commentPost(@RequestParam Long postId, @RequestBody CommentRequestDto commentRequestDto) {

    }

    @PostMapping(path = "/comment/vote")
    @ResponseStatus(HttpStatus.CREATED)
    public void voteComment(@RequestParam Long commentId, @RequestBody VoteRequestDto voteRequestDto) {
        postService.voteComment(commentId, voteRequestDto);
    }


    @PostMapping(path = "/vote")
    @ResponseStatus(HttpStatus.CREATED)
    public void votePost(@RequestParam Long postId, @RequestBody VoteRequestDto voteRequestDto) {
        postService.votePost(postId, voteRequestDto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createPost(@ModelAttribute PostRequestDto postRequestDto) {
        postService.createPost(postRequestDto);

    }

    @DeleteMapping
    public void deletePost(@RequestParam Long postId) {
        postService.deletePost(postId);
    }

    @DeleteMapping(path = "/comment")
    public void deleteComment(@RequestParam Long commentId) {
        postService.deleteComment(commentId);
    }

    @PutMapping
    public void updatePost(@RequestParam Long postId, @ModelAttribute PostRequestDto postRequestDto) {
        postService.updatePost(postId, postRequestDto);
    }

    @PutMapping(path = "comment")
    public void updateComment(@RequestParam Long commentId, @ModelAttribute CommentRequestDto commentRequestDto) {
        postService.updateComment(commentId, commentRequestDto);
    }


}
