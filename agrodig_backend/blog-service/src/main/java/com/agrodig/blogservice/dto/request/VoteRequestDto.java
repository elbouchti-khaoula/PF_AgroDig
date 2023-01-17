package com.agrodig.blogservice.dto.request;


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
}
