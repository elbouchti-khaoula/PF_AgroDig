package com.agrodig.blogservice.repository;

import com.agrodig.blogservice.model.Attachement;
import com.agrodig.blogservice.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttachementRepository  extends JpaRepository<Attachement,Long> {
}
