package com.agrodig.blogservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class BlogResponseDto {
    private Long id;

    private String body;

    private String title;

    private Date creationDate;

    private int viewCount;

    private int commentCount;

    private int upVoteCount;

    private int downVoteCount;

    private UserResponseDto poster;

    private Date lastActivityDate;

    //  private List<Attachement> attachements;

    private List<String> tagNames;
}
