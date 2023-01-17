package com.agrodig.usersservice.exception.user;


import com.agrodig.usersservice.exception.GeneralException;

public class UserNotAuthenticatedException extends GeneralException {
    public UserNotAuthenticatedException() {
        super("UserNotAuthenticatedException", "user is not authenticated");
    }
}
