package com.agrodig.blogservice.controller;

import com.agrodig.blogservice.dto.request.BlogRequestDto;
import com.agrodig.blogservice.dto.request.CommentRequestDto;
import com.agrodig.blogservice.dto.request.VoteRequestDto;
import com.agrodig.blogservice.dto.response.BlogResponseDto;
import com.agrodig.blogservice.dto.response.CommentResponseDto;
import com.agrodig.blogservice.dto.response.TagResponseDto;
import com.agrodig.blogservice.dto.response.VoteResponseDto;
import com.agrodig.blogservice.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public List<BlogResponseDto> getBlogsForUser() {
        return blogService.getMyBlogs();
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
    public void createBlog(@RequestBody BlogRequestDto blogRequestDto) {
        blogService.createBlog(blogRequestDto);
    }

    @PostMapping(path = "/comment")
    @ResponseStatus(HttpStatus.CREATED)
    public void commentBlog(@RequestParam Long blogId, @RequestBody CommentRequestDto commentRequestDto) {
        blogService.commentBlog(blogId, commentRequestDto);
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

    @PutMapping
    public void updateBlog(@RequestBody BlogRequestDto blogRequestDto) {
        blogService.updateBlog(blogRequestDto);
    }

}

