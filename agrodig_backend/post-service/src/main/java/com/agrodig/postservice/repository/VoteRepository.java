package com.agrodig.postservice.repository;

import com.agrodig.postservice.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {
}
