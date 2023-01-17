package com.agrodig.usersservice.controller;

import com.agrodig.usersservice.dto.SignUpFormDto;
import com.agrodig.usersservice.dto.UserResponseDto;
import com.agrodig.usersservice.model.User;
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

    @GetMapping(path="/{userId}")
    @ResponseStatus(HttpStatus.FOUND)
    public User getUserById(@PathVariable Long userId){
        return userService.getUserById(userId);
    }


    @PostMapping(headers={"target=adminCreateUser"})
    public UserResponseDto adminCreateUser(@RequestBody User user){
        return userService.adminCreateUser(user);
    }

    @PostMapping(path = {"signup"})
    public UserResponseDto signUp(@RequestBody SignUpFormDto signupForm){
        return userService.singUp(signupForm);
    }

    @RequestMapping(method = RequestMethod.PUT, path="{userId}",headers={"target=updateEmail"})
    public void updateEmail(@PathVariable Long userId,@RequestBody String email){
        userService.updateEmail(userId, email);
    }

    @GetMapping(path="/profile")
    public UserResponseDto profile(){
        return userService.getUserResponseDto();
    }

    @GetMapping(path="/users-by-id")
    public List<UserResponseDto> getUsersByIdList(@RequestParam List<Long> ids){
        return userService.getUsersById(ids);
    }

}
