package com.agrodig.blogservice.repository;

import com.agrodig.blogservice.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog,Long> {
    List<Blog> findByPosterId(Long posterId);
}
