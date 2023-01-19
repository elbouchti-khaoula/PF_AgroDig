package com.agrodig.blogservice.controller;

import com.agrodig.blogservice.config.FileConfig;
import com.agrodig.blogservice.dto.request.BlogRequestDto;
import com.agrodig.blogservice.dto.request.CommentRequestDto;
import com.agrodig.blogservice.dto.request.VoteRequestDto;
import com.agrodig.blogservice.dto.response.*;
import com.agrodig.blogservice.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;


//*********
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


import static org.aspectj.weaver.tools.cache.SimpleCacheFactory.path;
import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;
    private final FileConfig fileConfig;

    @GetMapping
    public List<BlogResponseDto> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping(path = "/myBlogs")
    public List<BlogResponseDto> getBlogsForUser(@RequestBody UserResponseDto userResponseDto) {
        return blogService.getMyBlogs(userResponseDto);
    }

    @GetMapping(path = "/tags/{blogId}")
    public List<TagResponseDto> getTagsByBlog(@PathVariable Long blogId) {
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

