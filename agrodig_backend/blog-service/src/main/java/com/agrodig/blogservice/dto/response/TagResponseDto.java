package com.agrodig.blogservice.dto.response;

import com.agrodig.blogservice.model.Blog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class TagResponseDto {
    private Long id;
    private String name;
    private int usageCount;
}
