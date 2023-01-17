package com.agrodig.blogservice.dto.request;

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
    private Long id;
    private String body;
    private String title;
    //@OneToMany(mappedBy = "blog", fetch = FetchType.LAZY)
    //private List<Attachement> attachements;
    private List<Long> tagIds;
}
