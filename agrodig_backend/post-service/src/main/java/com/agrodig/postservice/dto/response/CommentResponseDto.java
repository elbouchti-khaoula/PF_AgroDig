package com.agrodig.postservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class CommentResponseDto {
    private Long id;

    private String body;

    private Instant createdAt;

    private UserResponseDto commenter;

    private int upVoteCount;

    private int downVoteCount;
}
