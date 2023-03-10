package com.agrodig.usersservice.model;
import com.agrodig.usersservice.security.ApplicationUserRole;
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
    private ApplicationUserRole role;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_pic_id", referencedColumnName = "image_id")
    private Image profilePic;
}