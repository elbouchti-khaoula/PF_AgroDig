package com.agrodig.usersservice.repository;

import com.agrodig.usersservice.dto.UserResponseDto;
import com.agrodig.usersservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);
    List<User> findByIdIn(List<Long> ids);
    Optional<User> findByEmail(String email);
}
