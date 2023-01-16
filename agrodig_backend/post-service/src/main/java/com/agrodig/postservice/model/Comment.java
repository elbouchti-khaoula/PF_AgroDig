package com.agrodig.postservice.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long comment_id;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="OWNER_ID")
    @NotNull
    private User owner;*/

    private Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;

    private String body;

    private String attachementURL;

    @ManyToOne
    private Post post;
}
