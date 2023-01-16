package com.agrodig.userservice.model;
import lombok.*;
import javax.persistence.*;

import java.util.Date;

@Entity
@Table( name = "MY_USER")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;
    private Boolean verified;
    private Date birthDate;
    private Date creationDate;
}