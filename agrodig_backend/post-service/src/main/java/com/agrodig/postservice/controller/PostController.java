package com.agrodig.postservice.controller;

import com.agrodig.postservice.config.FileConfig;
import com.agrodig.postservice.dto.request.CommentRequestDto;
import com.agrodig.postservice.dto.request.TagRequestDto;
import com.agrodig.postservice.dto.request.VoteRequestDto;
import com.agrodig.postservice.dto.response.*;
import com.agrodig.postservice.dto.request.PostRequestDto;
import com.agrodig.postservice.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping(path = "api/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final FileConfig fileConfig;

    @GetMapping
    public List<PostResponseDto> getAllPosts() {
        return postService.getAllPosts();
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

    @GetMapping(path="/alltags")
    public List<TagResponseDto> getAllTags(){
        return postService.getAllTags();
    }

    @GetMapping(path = "/download/{fileName}")
    public ResponseEntity<Resource> download
            (@PathVariable String fileName) throws IOException {

        File file = new File(fileConfig.getDirectory() + fileName);
        Path path = Paths.get(file.getAbsolutePath());
        ByteArrayResource resource =
                new ByteArrayResource(Files.readAllBytes(path));

        return ResponseEntity.ok()
                .contentLength(file.length())
                .contentType(MediaType
                        .parseMediaType("application/octet-stream"))
                .body(resource);
    }


}
