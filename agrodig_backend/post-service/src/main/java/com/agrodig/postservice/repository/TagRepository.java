package com.agrodig.postservice.repository;

import com.agrodig.postservice.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
