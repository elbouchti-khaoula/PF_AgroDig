package com.agrodig.blogservice.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class Comment {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String body;

    private Date creationDate;

    private Date updateDate;

    private Long commenterId;

    @OneToMany(mappedBy="comment", fetch = FetchType.LAZY)
    private List<Attachement> attachements;

    @OneToMany(mappedBy="comment", fetch = FetchType.LAZY)
    private List<Vote> votes ;

    @ManyToOne
    @JoinColumn(name = "blog_id")
    private Blog blog;

}
