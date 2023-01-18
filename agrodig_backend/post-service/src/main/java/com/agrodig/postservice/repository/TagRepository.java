package com.agrodig.postservice.repository;

import com.agrodig.postservice.model.Tag;
import com.agrodig.postservice.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
