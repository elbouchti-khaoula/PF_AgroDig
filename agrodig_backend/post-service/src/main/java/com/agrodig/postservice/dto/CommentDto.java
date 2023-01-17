package com.agrodig.postservice.dto;

import com.agrodig.postservice.model.Comment;
import com.agrodig.postservice.model.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private Long comment_id;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;
    private String body;
    private String attachementURL;

    public static CommentDto commentEntityToDto(Comment commentEntity){
        return CommentDto.builder()
                .comment_id(commentEntity.getComment_id())
                .createdAt(commentEntity.getCreatedAt())
                .updatedAt(commentEntity.getUpdatedAt())
                .deletedAt(commentEntity.getDeletedAt())
                .body(commentEntity.getBody())
                .attachementURL(commentEntity.getAttachementURL())
                .build();
    }

}
