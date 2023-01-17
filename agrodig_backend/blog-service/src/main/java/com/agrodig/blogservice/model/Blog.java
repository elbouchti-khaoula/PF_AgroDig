package com.agrodig.blogservice.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Blog {
    @Id
    private Long id;
}
