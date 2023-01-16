package com.agrodig.usersservice.controller;

import com.agrodig.usersservice.dto.response.UserResponseDto;
import com.agrodig.usersservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponseDto> getUsers() {
        return userService.getUsers();
    }
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void test() {

    }

    @GetMapping(path ="")
    @ResponseStatus(HttpStatus.OK)
    public String getChaimaa(){
        return "chaimaa";
    }

}
