package com.agrodig.postservice.repository;

import com.agrodig.postservice.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    List<Vote>  findByPost_Id(Long postId);
    List<Vote> findByComment_Id(Long id);
}
