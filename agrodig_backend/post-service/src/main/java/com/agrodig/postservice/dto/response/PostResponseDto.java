package com.agrodig.postservice.dto.response;

import com.agrodig.postservice.model.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponseDto {
    private Long id;

    private String body;

    private String title;

    private Instant creationDate;

    private int viewCount;

    private int commentCount;

    private int upVoteCount;

    private int expertUpVoteCount;

    private int expertDownVoteCount;

    private int downVoteCount;

    private UserResponseDto poster;

    private Instant updatedAt;

    private List<FileResponseDto> files;

    private List<String> tagNames;

}
