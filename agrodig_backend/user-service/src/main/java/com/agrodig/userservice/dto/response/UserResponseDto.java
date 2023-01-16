package com.agrodig.userservice.dto.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Data
@AllArgsConstructor
@Builder
public class UserResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private Boolean verified;
    private Date birthDate;
    private Date creationDate;
}
