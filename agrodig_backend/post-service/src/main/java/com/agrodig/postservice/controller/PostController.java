package com.agrodig.postservice.controller;
import com.agrodig.postservice.dto.PostDto;
import com.agrodig.postservice.dto.PostRequestDto;
import com.agrodig.postservice.model.Post;
import com.agrodig.postservice.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/post")
//@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/save-post")
    public PostDto createPost(@ModelAttribute PostRequestDto postRequestDto){
        return postService.createPost(postRequestDto);
    }

    @DeleteMapping("/delete-post/{post_id}")
    public void deletePost(@PathVariable(name="post_id") Long postId){
        postService.deletePost(postId);
    }

    @PutMapping("/update-post/{post_id}")
    public PostDto updatePost(@PathVariable(name = "post_id") Long postId, @ModelAttribute PostRequestDto postRequestDto){
        return postService.updatePost(postId,postRequestDto);
    }
}
