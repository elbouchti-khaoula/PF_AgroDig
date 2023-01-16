package com.agrodig.usersservice.controller;

import com.agrodig.usersservice.dto.response.UserResponseDto;
import com.agrodig.usersservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping(path ="users")
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponseDto> getUsers(){
        return userService.getUsers();
    }

    @GetMapping(path ="")
    @ResponseStatus(HttpStatus.OK)
    public String getChaimaa(){
        return "chaimaa";
    }

}
