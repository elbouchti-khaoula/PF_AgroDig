package com.agrodig.blogservice.controller;

import com.agrodig.blogservice.dto.request.BlogRequestDto;
import com.agrodig.blogservice.dto.request.CommentRequestDto;
import com.agrodig.blogservice.dto.request.VoteRequestDto;
import com.agrodig.blogservice.dto.response.*;
import com.agrodig.blogservice.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;

    @GetMapping
    public List<BlogResponseDto> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping(path = "/myBlogs")
    public List<BlogResponseDto> getBlogsForUser(@RequestBody UserResponseDto userResponseDto) {
        return blogService.getMyBlogs(userResponseDto);
    }

    @GetMapping(path = "/tags")
    public List<TagResponseDto> getTagsByBlog(@RequestParam Long blogId) {
        return blogService.getTagsByBlog(blogId);
    }

    @GetMapping(path = "/comments")
    public List<CommentResponseDto> getCommentsByBlog(@RequestParam Long blogId) {
        return blogService.getCommentsByBlog(blogId);
    }

    @GetMapping(path = "/votes")
    public List<VoteResponseDto> getVotesByBlog(@RequestParam Long blogId) {
        return blogService.getVotesByBlog(blogId);
    }

    @GetMapping(path = "/comments/votes")
    public List<VoteResponseDto> getVotesByComment(@RequestParam Long commentId) {
        return blogService.getVotesByComment(commentId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createBlog(@ModelAttribute BlogRequestDto blogRequestDto) {
        blogService.createBlog(blogRequestDto);
    }


    @PostMapping(path = "/comment")
    @ResponseStatus(HttpStatus.CREATED)
    public void commentBlog(@RequestParam Long blogId, @RequestBody CommentRequestDto commentRequestDto) {
        blogService.commentBlog(blogId, commentRequestDto);
    }
    @PostMapping(path = "/comment/vote")
    @ResponseStatus(HttpStatus.CREATED)
    public void voteComment(@RequestParam Long commentId, @RequestBody VoteRequestDto voteRequestDto) {
        blogService.voteComment(commentId, voteRequestDto);
    }


    @PostMapping(path = "/vote")
    @ResponseStatus(HttpStatus.CREATED)
    public void voteBlog(@RequestParam Long blogId, @RequestBody VoteRequestDto voteRequestDto) {
        blogService.voteBlog(blogId, voteRequestDto);
    }

    @DeleteMapping
    public void deleteBlog(@RequestParam Long blogId) {
        blogService.deleteBlog(blogId);
    }

    @DeleteMapping(path = "/comment")
    public void deleteComment(@RequestParam Long commentId) {
        blogService.deleteComment(commentId);
    }


    @PutMapping
    public void updateBlog(@RequestBody BlogRequestDto blogRequestDto,@RequestParam Long blogId) {
        blogService.updateBlog(blogRequestDto,blogId);
    }
    @PutMapping(path = "comment")
    public void updateComment(@RequestParam Long commentId, @ModelAttribute CommentRequestDto commentRequestDto) {
        blogService.updateComment(commentId,commentRequestDto);
    }

    @GetMapping(path="/tags")
    public List<TagResponseDto> getTags(){
        return blogService.getAllTags();
    }


}

