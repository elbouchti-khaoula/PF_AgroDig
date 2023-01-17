package com.agrodig.blogservice.dto.request;


import com.agrodig.blogservice.dto.response.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class VoteRequestDto {
    private Boolean isPositive;
    private Long userId;
}
