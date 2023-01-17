package com.agrodig.blogservice.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Attachement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attachement_id")
    private Long id;
    private AttachementType type;
    private String path;
    private String name;
    private Date uploadDate;
    @ManyToOne
    @JoinColumn(name = "blog_id")
    private Blog blog;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment ;
}
