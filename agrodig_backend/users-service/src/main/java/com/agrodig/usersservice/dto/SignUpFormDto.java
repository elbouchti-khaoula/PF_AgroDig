package com.agrodig.usersservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignUpFormDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
}
