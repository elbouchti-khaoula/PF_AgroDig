package com.agrodig.postservice.dto;

import com.agrodig.postservice.model.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

//@Builder
@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostRequestDto {
    private MultipartFile file;
    private String title;
    private String body;
}


