package com.agrodig.blogservice.dto.request;

import com.agrodig.blogservice.dto.response.UserResponseDto;
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
public class CommentRequestDto {
    private String body;
    private UserResponseDto userResponseDto;
    private List<MultipartFile> files;
}
