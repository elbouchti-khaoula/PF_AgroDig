package com.agrodig.postservice.controller;
import com.agrodig.postservice.dto.PostDto;
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

    /*@PostMapping
    public PostDto createPost(@RequestBody Post post){
        return postService.createPost(PostDto.postEntityToDto(post));
    }*/

    @PostMapping(path = "/test")
    @ResponseStatus(HttpStatus.OK)
    public void test() {

    }

    /*@PostMapping("/save-post")
    public Post createPost(@RequestBody Post post){
        return postService.createPost(post);
    }*/
}
