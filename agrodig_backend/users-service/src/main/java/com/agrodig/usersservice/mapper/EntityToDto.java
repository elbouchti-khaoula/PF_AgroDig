package com.agrodig.usersservice.mapper;

import com.agrodig.usersservice.dto.response.UserResponseDto;
import com.agrodig.usersservice.model.User;

public class EntityToDto {
    public static UserResponseDto userToUserResponseDto(User user) {
        return UserResponseDto.builder().id(user.getId()).email(user.getEmail()).firstName(user.getFirstName()).lastName(user.getLastName()).birthDate(user.getBirthDate()).username(user.getUsername()).creationDate(user.getCreationDate()).verified(user.getVerified()).build();
    }
}
