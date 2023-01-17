package com.agrodig.blogservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserResponseDto {
    private String firstName;
    private String lastName;
    private String email;
    private String username;
}
