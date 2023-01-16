package com.agrodig.postservice.dto;

import com.agrodig.postservice.model.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private Long post_id;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;
    private String title;
    private String body;
    private int viewCount;
    private List<Tag> tags;
    private Collection<File> files;
    private Collection<Comment> comments;
    private int commentsCount;
    private Set<Vote> votes;
    private int votesCount;

    public static PostDto postEntityToDto(Post postEntity){
        return PostDto.builder()
                .post_id(postEntity.getPost_id())
                .createdAt(postEntity.getCreatedAt())
                .updatedAt(postEntity.getUpdatedAt())
                .deletedAt(postEntity.getDeletedAt())
                .title(postEntity.getTitle())
                .body(postEntity.getBody())
                .viewCount(postEntity.getViewCount())
                .commentsCount(postEntity.getCommentsCount())
                .votesCount(postEntity.getVotesCount())
                .build();
    }
}
