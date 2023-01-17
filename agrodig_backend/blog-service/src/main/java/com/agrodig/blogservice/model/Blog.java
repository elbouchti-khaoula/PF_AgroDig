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
public class Blog {
    @Id
    @Column(name = "blog_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String body;

    private String title;

    private Date creationDate;

    private Date deletionDate;

    private int viewCount;

    private Date lastActivityDate;

    private Long posterId;

    @OneToMany(mappedBy = "blog", fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    private List<Attachement> attachements;

    @OneToMany(mappedBy = "blog", fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    @OneToMany(mappedBy = "blog", fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    private List<Vote> votes;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "tag_blog",
            joinColumns = {@JoinColumn(name = "blog_id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id")}
    )
    private List<Tag> tags;


}
