package com.agrodig.postservice.repository;

import com.agrodig.postservice.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
