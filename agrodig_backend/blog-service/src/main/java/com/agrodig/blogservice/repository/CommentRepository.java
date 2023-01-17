package com.agrodig.blogservice.repository;

import com.agrodig.blogservice.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository  extends JpaRepository<Comment,Long> {
    List<Comment> findByBlog_Id(Long id);
}
