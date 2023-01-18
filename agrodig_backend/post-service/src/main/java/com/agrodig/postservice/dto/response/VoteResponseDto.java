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
public class VoteResponseDto {
    private Long id;
    private Boolean isPositive;
    private UserResponseDto userResponseDto;
    private Instant createdAt;
}
