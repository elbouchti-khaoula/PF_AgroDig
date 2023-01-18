package com.agrodig.postservice.repository;

import com.agrodig.postservice.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    List<Vote>  findByPost_Id(Long postId);
    List<Vote> findByComment_Id(Long id);
}
