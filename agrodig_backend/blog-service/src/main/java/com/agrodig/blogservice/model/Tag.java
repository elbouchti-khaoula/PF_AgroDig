package com.agrodig.blogservice.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class Tag {
    @Id
    @Column(name = "tag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int usageCount;

    @ManyToMany(fetch = FetchType.LAZY) @JoinTable(
            name = "tag_blog",
            joinColumns = {@JoinColumn(name = "tag_id")},
            inverseJoinColumns = {@JoinColumn(name = "blog_id")}
    )
    private List<Blog> blogs;

}
