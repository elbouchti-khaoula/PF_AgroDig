package com.agrodig.usersservice.model;

import lombok.*;
import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;
    private String path;
    private String name;
    private Date uploadDate;
    @OneToOne(mappedBy = "profilePic")
    private User user;

}