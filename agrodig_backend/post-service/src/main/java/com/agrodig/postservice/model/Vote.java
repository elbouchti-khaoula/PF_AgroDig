package com.agrodig.postservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name="votes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vote_id;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="OWNER_ID")
    @NotNull
    private User owner;*/

    private Instant createdAt;
    private VoteType voteType;

    @ManyToOne
    private Post post;
}
