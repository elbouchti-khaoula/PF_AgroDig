package com.agrodig.blogservice.mapper;


import com.agrodig.blogservice.dto.response.*;
import com.agrodig.blogservice.model.*;

import java.util.stream.Collectors;

public class EntityToDto {
    public static BlogResponseDto blogToBlogResponseDto(Blog blog, UserResponseDto userResponseDto) {
        return BlogResponseDto
                .builder()
                .id(blog.getId())
                .creationDate(blog.getCreationDate())
                .title(blog.getTitle())
                .body(blog.getBody())
                .tagNames(blog.getTags().stream().map(Tag::getName).collect(Collectors.toList()))
                .viewCount(blog.getViewCount())
                .lastActivityDate(blog.getLastActivityDate())
                .commentCount((int) blog.getComments().stream().count())
                .expertUpVoteCount((int) blog.getVotes().stream().filter(vote -> vote.getIsPositive() && vote.getIsByExpert()).count())
                .expertDownVoteCount(((int) blog.getVotes().stream().filter(vote -> !vote.getIsPositive() && vote.getIsByExpert()).count()))
                .upVoteCount((int) blog.getVotes().stream().filter(vote -> vote.getIsPositive() && ! vote.getIsByExpert()).count())
                .downVoteCount((int) blog.getVotes().stream().filter(vote -> !vote.getIsPositive() && ! vote.getIsByExpert()).count())
                .poster(userResponseDto)
                .attachements(blog.getAttachements().stream().map(EntityToDto::AttachementToAttachementResponseDto).collect(Collectors.toList()))
                .build();
    }
    public  static TagResponseDto tagToTagResponseDto(Tag tag){
        return TagResponseDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
    }
    public static CommentResponseDto commentToCommentResponseDto(Comment comment, UserResponseDto userResponseDto) {
        return CommentResponseDto
                .builder()
                .id(comment.getId())
                .body(comment.getBody())
                .creationDate(comment.getCreationDate())
                .upVoteCount((int) comment.getVotes().stream().filter(vote -> vote.getIsPositive()).count())
                .downVoteCount((int) comment.getVotes().stream().filter(vote -> !vote.getIsPositive()).count())
                .commenter(userResponseDto)
                .build();
    }
    public static VoteResponseDto VoteToVoteResponseDto(Vote vote, UserResponseDto userResponseDto){
        return VoteResponseDto
                .builder()
                .creationDate(vote.getCreationDate())
                .id(vote.getId())
                .isByExpert(vote.getIsByExpert())
                .isPositive(vote.getIsPositive())
                .userResponseDto(userResponseDto)
                .build();
    }

    public static AttachementResponseDto AttachementToAttachementResponseDto(Attachement attachement){
        return AttachementResponseDto
                .builder()
                .id(attachement.getId())
                .name(attachement.getName())
                .type(attachement.getType().value())
                .path(attachement.getPath()+attachement.getId() + "." + attachement.getType().value())
                .uploadDate(attachement.getUploadDate())
                .build();

    }
    public static TagResponseDto TagToTagResponseDto(Tag tag){
        return TagResponseDto
                .builder()
                .id(tag.getId())
                .name(tag.getName())
                .usageCount(tag.getUsageCount())
                .build();
    }
}

