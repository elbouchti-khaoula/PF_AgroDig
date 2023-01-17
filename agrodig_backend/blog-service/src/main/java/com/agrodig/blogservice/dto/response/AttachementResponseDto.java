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
public class AttachementResponseDto {
    private Long id;
    private String name;
    private String path;
    private String type;
    private Date uploadDate;
}
