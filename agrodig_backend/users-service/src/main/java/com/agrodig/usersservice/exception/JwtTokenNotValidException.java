package com.agrodig.usersservice.exception;

public class JwtTokenNotValidException extends RuntimeException {

    public JwtTokenNotValidException() {
        super("Invalid jwt token");
    }
}
