package com.agrodig.postservice.model;


import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    private Instant createdAt;

    private Instant updatedAt;

    private Instant deletedAt;

    private Long commenterId;

    private String body;

    private String attachementURL;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @OneToMany(mappedBy="comment", fetch = FetchType.LAZY)
    private List<File> files;

    @OneToMany(mappedBy="comment", fetch = FetchType.LAZY)
    private List<Vote> votes ;

}
