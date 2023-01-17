package com.agrodig.postservice.model;

import lombok.*;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name="files")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long file_id;

    private Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;

    private String name;
    private String path;
    private FileType type;

    @ManyToOne
    @JoinColumn(name = "id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

}
