package com.agrodig.postservice.service;

import com.agrodig.postservice.dto.CommentDto;
import com.agrodig.postservice.dto.CommentRequestDto;
import com.agrodig.postservice.model.Comment;
import com.agrodig.postservice.model.Post;
import com.agrodig.postservice.repository.CommentRepository;
import com.agrodig.postservice.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final FileService fileService;

    @Autowired
    public CommentService(CommentRepository commentRepository, PostRepository postRepository, FileService fileService){
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.fileService = fileService;
    }

    // add new comment to db
    public CommentDto createComment(CommentRequestDto commentRequestDto, Long postId){
        // instanciate current time
        Instant instant = Instant.now();

        // instanciate new comment
        Comment comment = new Comment();

        // find post to which the comment will be linked
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("post not found"));

        // create comment object
        comment.setBody(commentRequestDto.getBody());
        comment.setCreatedAt(instant);
        comment.setUpdatedAt(instant);
        comment.setPost(post);
        // persiste into 'comments' table
        commentRepository.save(comment);
        // to add file to comment we need to add another column to the files table to store the comment_id
        //fileService.uploadFile(commentRequestDto,comment);

        return CommentDto.commentEntityToDto(comment);
    }

    // delete comment from db
    public void deleteComment(Long commentId){
        // find comment by id
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalStateException("comment not found"));

        // delete attached files
            // code here

        // delete comment from db
        commentRepository.delete(comment);
    }

    // update existing comment
    public CommentDto updateComment(Long commentId, CommentDto newCommentDto){
        // instanciate current time
        Instant instant = Instant.now();
        // find comment to update
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalStateException("comment not found"));

        // update comment
        comment.setBody(newCommentDto.getBody());
        comment.setUpdatedAt(instant);

        // update comment into 'comments' table
        commentRepository.save(comment);

        return CommentDto.commentEntityToDto(comment);
    }

    // get all post comments
    /*public Collection<CommentDto> getAllPostComments(Long postId){
        Collection<Comment> comments = new ArrayList<>();
    }*/
}
