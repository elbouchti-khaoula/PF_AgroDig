package com.agrodig.blogservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class CommentResponseDto {
    private Long id;

    private String body;

    private Date creationDate;

    private UserResponseDto commenter;

    //  @OneToMany(mappedBy="comment", fetch = FetchType.LAZY)
    // private List<Attachement> attachements
    private int upVoteCount;
    private int downVoteCount;
}
