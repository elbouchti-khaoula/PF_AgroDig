package com.agrodig.postservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name="files")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long file_id;

    private Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;

    private String filePath;

    @ManyToOne
    private Post post;
}
