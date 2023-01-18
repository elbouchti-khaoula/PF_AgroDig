package com.agrodig.postservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class TagResponseDto {
    private Long id;
    private String name;
    private int usageCount;
}
