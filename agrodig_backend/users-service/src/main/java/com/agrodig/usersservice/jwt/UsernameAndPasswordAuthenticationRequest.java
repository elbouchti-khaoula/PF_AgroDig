package com.agrodig.usersservice.jwt;

import lombok.Data;

@Data
public class UsernameAndPasswordAuthenticationRequest {
    private String username;
    private String password;
}
