package com.agrodig.postservice.service;

import com.agrodig.postservice.dto.PostDto;
import com.agrodig.postservice.dto.PostRequestDto;
import com.agrodig.postservice.model.Post;
import com.agrodig.postservice.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final FileService fileService;

    @Autowired
    public PostService(PostRepository postRepository, FileService fileService) {
        this.postRepository = postRepository;
        this.fileService = fileService;
    }

    // Create new post
    public PostDto createPost(PostRequestDto postRequestDto){
        Instant instant = Instant.now();
        Post post = new Post();

        post.setBody(postRequestDto.getBody());
        post.setTitle(postRequestDto.getTitle());
        post.setCreatedAt(instant);
        post.setUpdatedAt(instant);
        post.setViewCount(0);
        post.setCommentsCount(0);
        post.setVotesCount(0);

        postRepository.save(post);

        fileService.uploadFile(postRequestDto,post);

        return PostDto.postEntityToDto(post);
    }

    // Delete post
    public void deletePost(Long postId){
        // find post by id
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("post not found"));

        // delete attached files
            // code here
        //fileService.deleteFile(post.getPost_id());

        // delete post from db
        postRepository.delete(post);
    }

    // Update post
    public PostDto updatePost(Long postId, PostRequestDto postRequestDto){
        Instant instant = Instant.now();
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("post not found"));

        post.setBody(postRequestDto.getBody());
        post.setTitle(postRequestDto.getTitle());
        post.setUpdatedAt(instant);
        post.setViewCount(0);
        post.setCommentsCount(0);
        post.setVotesCount(0);

        postRepository.save(post);

        // get all files related to the post
        // delete them from the db and local storage
        // add new files to db and local storage
        return PostDto.postEntityToDto(post);
    }
}
