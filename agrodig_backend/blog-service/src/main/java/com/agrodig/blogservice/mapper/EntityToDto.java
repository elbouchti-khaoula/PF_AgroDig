package com.agrodig.blogservice.mapper;

import com.agrodig.blogservice.dto.response.BlogResponseDto;
import com.agrodig.blogservice.dto.response.CommentResponseDto;
import com.agrodig.blogservice.dto.response.UserResponseDto;
import com.agrodig.blogservice.model.Blog;
import com.agrodig.blogservice.model.Comment;

public class EntityToDto {
    public static BlogResponseDto blogToBlogResponseDto(Blog blog, UserResponseDto userResponseDto) {
        return BlogResponseDto
                .builder()
                .id(blog.getId())
                .creationDate(blog.getCreationDate())
                .title(blog.getTitle())
                .body(blog.getBody())
                .viewCount(blog.getViewCount())
                .lastActivityDate(blog.getLastActivityDate())
                .commentCount((int) blog.getComments().stream().count())
                .upVoteCount((int) blog.getVotes().stream().filter(vote -> vote.getIsPositive()).count())
                .downVoteCount((int) blog.getVotes().stream().filter(vote -> !vote.getIsPositive()).count())
                .poster(userResponseDto)
                .build();
    }

    public static CommentResponseDto commentToCommentResponseDto(Comment comment, UserResponseDto userResponseDto) {
        return CommentResponseDto
                .builder()
                .body(comment.getBody())
                .creationDate(comment.getCreationDate())
                .upVoteCount((int) comment.getVotes().stream().filter(vote -> vote.getIsPositive()).count())
                .downVoteCount((int) comment.getVotes().stream().filter(vote -> !vote.getIsPositive()).count())
                .commenter(userResponseDto)
                .build();
    }
}

