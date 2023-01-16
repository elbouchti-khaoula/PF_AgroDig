package com.agrodig.postservice.controller;

import com.agrodig.postservice.dto.PostDto;
import com.agrodig.postservice.model.Post;
import com.agrodig.postservice.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/posts")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/save-post")
    public PostDto createPost(@RequestBody Post post){
        return postService.createPost(PostDto.postEntityToDto(post));
    }

    /*@PostMapping("/save-post")
    public Post createPost(@RequestBody Post post){
        return postService.createPost(post);
    }*/
}
