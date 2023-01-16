package com.agrodig.postservice.service;

import com.agrodig.postservice.dto.PostDto;
import com.agrodig.postservice.model.Post;
import com.agrodig.postservice.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class PostService {
    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public PostDto createPost(PostDto postDto){
        Instant instant = Instant.now();
        Post post = new Post();

        post.setBody(postDto.getBody());
        post.setTitle(postDto.getTitle());
        post.setCreatedAt(instant);
        post.setUpdatedAt(instant);
        post.setViewCount(0);
        post.setCommentsCount(0);
        post.setVotesCount(0);

        postRepository.save(post);

        return PostDto.postEntityToDto(post);
    }
    /*public Post createPost(Post post){
        Instant instant = Instant.now();
        /*Post post = new Post();

        post.setBody(postDto.getBody());
        post.setTitle(postDto.getTitle());
        post.setCreatedAt(instant);
        post.setUpdatedAt(instant);
        post.setViewCount(0);
        post.setCommentsCount(0);
        post.setVotesCount(0);

        postRepository.save(post);

        return post;
        //return PostDto.postEntityToDto(post);
    }*/
}
