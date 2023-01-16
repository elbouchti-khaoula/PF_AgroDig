package com.agrodig.userservice.mapper;

import com.agrodig.userservice.dto.response.UserResponseDto;
import com.agrodig.userservice.model.User;

public class EntityToDto {
    public static UserResponseDto userToUserResponseDto(User user) {
        return UserResponseDto.builder().id(user.getId()).email(user.getEmail()).firstName(user.getFirstName()).lastName(user.getLastName()).birthDate(user.getBirthDate()).username(user.getUsername()).creationDate(user.getCreationDate()).verified(user.getVerified()).build();
    }
}
