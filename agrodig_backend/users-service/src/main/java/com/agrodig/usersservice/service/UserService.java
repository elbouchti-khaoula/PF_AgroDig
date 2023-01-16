package com.agrodig.usersservice.service;

import com.agrodig.usersservice.dto.response.UserResponseDto;
import com.agrodig.usersservice.mapper.EntityToDto;
import com.agrodig.usersservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserResponseDto> getUsers() {
        return userRepository.findAll().stream().map(EntityToDto::userToUserResponseDto).collect(Collectors.toList());
    }
}

