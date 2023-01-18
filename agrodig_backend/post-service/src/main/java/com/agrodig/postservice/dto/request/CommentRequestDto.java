package com.agrodig.postservice.dto.request;

import com.agrodig.postservice.dto.response.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequestDto {
    //private MultipartFile file;
    private String body;
    private UserResponseDto userResponseDto;
    private List<MultipartFile> files;
}
