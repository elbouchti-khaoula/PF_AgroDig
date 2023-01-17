package com.agrodig.postservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name="posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;
    private Long posterId;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;
    private String title;
    private String body;
    private int viewCount;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "post_tags",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<Tag> tags;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    private List<File> files;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    private List<Vote> votes;

}
