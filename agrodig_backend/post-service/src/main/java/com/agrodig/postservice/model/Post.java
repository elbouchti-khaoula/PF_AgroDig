package com.agrodig.postservice.model;

import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long post_id;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="OWNER_ID")
    @NotNull
    private User owner;*/

    private Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;
    private String title;
    private String body;
    private int viewCount;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Tag> tags;
    @JoinTable(
            name = "post_tags",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))

    @ElementCollection
    private List<String> attachementsURL;

    @OneToMany(mappedBy = "post")
    private Collection<Comment> comments;
    private int commentsCount;

    @OneToMany(mappedBy = "post")
    private Set<Vote> votes;
    private int votesCount;

    /*@ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "VIEW",
            joinColumns = {@JoinColumn(name = "post_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<User> viewedBy= new HashSet<>();*/

}
