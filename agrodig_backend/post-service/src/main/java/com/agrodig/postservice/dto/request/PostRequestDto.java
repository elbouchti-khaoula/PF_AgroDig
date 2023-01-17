package com.agrodig.postservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class PostRequestDto {
    private List<MultipartFile> files;
    private String title;
    private String body;
    private Long userId;
    private List<Long> tagIds;
}


