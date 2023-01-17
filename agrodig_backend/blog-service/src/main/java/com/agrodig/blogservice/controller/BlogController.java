package com.agrodig.blogservice.controller;

import com.agrodig.blogservice.dto.request.BlogRequestDto;
import com.agrodig.blogservice.dto.request.CommentRequestDto;
import com.agrodig.blogservice.dto.request.VoteRequestDto;
import com.agrodig.blogservice.dto.response.BlogResponseDto;
import com.agrodig.blogservice.dto.response.CommentResponseDto;
import com.agrodig.blogservice.dto.response.TagResponseDto;
import com.agrodig.blogservice.dto.response.VoteResponseDto;
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
    @GetMapping
    public  List<BlogResponseDto> getAllBlogs(){
         return null;
    }

    @GetMapping(path = "/myBlogs")
    public List<BlogResponseDto>  getBlogsForUser(){
        return  null;
    }

    @GetMapping(path = "/comments")
    public List<CommentResponseDto> getCommentsByBlog(@RequestParam Long blogId){
        return  null;
    }

    @GetMapping(path = "/votes")
    public List<VoteResponseDto> getVotesByBlog(@RequestParam Long blogId){
        return null;
    }
    @GetMapping(path = "/tags")
    public List<TagResponseDto> getTagsByBlog(@RequestParam Long blogId){
        return  null;
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BlogResponseDto createBlog(@RequestBody BlogRequestDto blogRequestDto){
        return null;
    }
    @PostMapping(path = "/comment")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponseDto commentBlog(@RequestParam Long blogId, @RequestBody CommentRequestDto commentRequestDto){
        return null;
    }

    @PostMapping(path = "/vote")
    @ResponseStatus(HttpStatus.CREATED)
    public VoteResponseDto voteBlog(@RequestParam Long blogId, @RequestBody VoteRequestDto voteRequestDto){
        return null;
    }
    @DeleteMapping
    public void deleteBlog(@RequestParam Long blogId){
    }

    @PutMapping
    public  BlogResponseDto updateBlog(@RequestBody BlogRequestDto blogRequestDto){
        return null;
    }



}

