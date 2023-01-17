package com.agrodig.postservice.service;

import com.agrodig.postservice.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
@Slf4j
@RequiredArgsConstructor
public class CommentService {
    private CommentRepository commentRepository;

}
