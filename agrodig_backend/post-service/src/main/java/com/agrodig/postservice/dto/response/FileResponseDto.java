package com.agrodig.postservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class FileResponseDto {
    private Long id;
    private String name;
    private String path;
    private String type;
    private Instant uploadDate  ;
}
