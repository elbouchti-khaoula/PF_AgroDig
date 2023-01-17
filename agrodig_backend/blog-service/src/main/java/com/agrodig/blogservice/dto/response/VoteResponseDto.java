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
public class VoteResponseDto {
    private Long id;
    private Boolean isPositive;
    private UserResponseDto userResponseDto;
    private Date creationDate;
}
