package com.agrodig.blogservice.service;

import com.agrodig.blogservice.dto.response.BlogResponseDto;
import com.agrodig.blogservice.dto.response.CommentResponseDto;
import com.agrodig.blogservice.dto.response.UserResponseDto;
import com.agrodig.blogservice.mapper.EntityToDto;
import com.agrodig.blogservice.model.Blog;
import com.agrodig.blogservice.model.Comment;
import com.agrodig.blogservice.repository.BlogRepository;
import com.agrodig.blogservice.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
@Slf4j
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;
    private final CommentRepository commentRepository;
    private final WebClient.Builder webClientBuilder;

    public List<BlogResponseDto> getAllBlogs() {
        //get users for all blogs from users service
        List<Blog> blogs = blogRepository.findAll();
        UserResponseDto[] userResponseDtos = webClientBuilder.build().get()
                .uri("http://users-service/api/user",
                        uriBuilder -> uriBuilder.queryParam("id", blogs.stream().map(Blog::getPosterId).collect(Collectors.toList())).build())
                .retrieve()
                .bodyToMono(UserResponseDto[].class)
                .block();
        //count up votes down votes comments
        return blogs.stream().map(blog -> EntityToDto.blogToBlogResponseDto(blog, Arrays
                        .stream(userResponseDtos)
                        .filter(userResponseDto -> userResponseDto.getId() == blog.getPosterId()).findFirst().get()))
                .collect(Collectors.toList());
    }

    public List<BlogResponseDto> getMyBlogs() {
        //call users service to get logged-in user
        UserResponseDto userResponseDto = webClientBuilder.build().get()
                .uri("http://users-service/api/user/profile")
                .retrieve()
                .bodyToMono(UserResponseDto.class)
                .block();
        //get blogs for user
        return blogRepository
                .findByPosterId(userResponseDto.getId())
                .stream()
                .map(blog -> EntityToDto.blogToBlogResponseDto(blog, userResponseDto))
                .collect(Collectors.toList());

    }

    public List<CommentResponseDto> getCommentsByBlog(Long blogId) {
        List<Comment> comments = commentRepository.findByBlog_Id(blogId);

        UserResponseDto[] userResponseDtos = webClientBuilder.build().get()
                .uri("http://users-service/api/user",
                        uriBuilder -> uriBuilder.queryParam("id", comments.stream().map(Comment::getCommenterId).collect(Collectors.toList())).build())
                .retrieve()
                .bodyToMono(UserResponseDto[].class)
                .block();


        return comments
                .stream()
                .map(comment -> EntityToDto.commentToCommentResponseDto(comment, Arrays
                        .stream(userResponseDtos)
                        .filter(userResponseDto -> userResponseDto.getId() == comment.getCommenterId()).findFirst().get()))
                .collect(Collectors.toList());
    }
}