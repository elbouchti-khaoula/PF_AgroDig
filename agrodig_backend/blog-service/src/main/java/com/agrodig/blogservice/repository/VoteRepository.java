package com.agrodig.blogservice.repository;

import com.agrodig.blogservice.model.Comment;
import com.agrodig.blogservice.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository  extends JpaRepository<Vote,Long> {
    List<Vote> findByBlog_Id(Long id);
    List<Vote> findByComment_Id(Long id);
}
