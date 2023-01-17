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
public class CommentResponseDto {
    private Long id;

    private String body;

    private Date creationDate;

    private UserResponseDto userResponseDto;

  //  @OneToMany(mappedBy="comment", fetch = FetchType.LAZY)
   // private List<Attachement> attachements
    private List<VoteResponseDto> votes ;
}
