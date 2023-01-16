package com.agrodig.usersservice.exception.user;


import com.agrodig.usersservice.exception.GeneralException;

public class InvalidUsernameException extends GeneralException {
    public InvalidUsernameException(String msg) {
        super("InvalidUsernameException",msg);
    }
}
