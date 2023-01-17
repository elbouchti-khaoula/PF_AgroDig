package com.agrodig.blogservice.dto.request;

import com.agrodig.blogservice.dto.response.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class BlogRequestDto {
    private String body;
    private String title;
    //@OneToMany(mappedBy = "blog", fetch = FetchType.LAZY)
    //private List<Attachement> attachements;
    private UserResponseDto userResponseDto;
    private List<Long> tagIds;
}
