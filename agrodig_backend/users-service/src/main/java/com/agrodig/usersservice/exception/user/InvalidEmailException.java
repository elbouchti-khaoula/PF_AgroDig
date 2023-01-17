package com.agrodig.usersservice.exception.user;


import com.agrodig.usersservice.exception.GeneralException;

public class InvalidEmailException extends GeneralException {


    public InvalidEmailException(String message) {
        super("InvalidUsernameException", message);
    }
}
