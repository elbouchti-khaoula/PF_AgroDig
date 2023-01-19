package com.agrodig.postservice.mapper;

import com.agrodig.postservice.dto.response.*;
import com.agrodig.postservice.model.*;

import java.util.stream.Collectors;

public class EntityToDto {
    public static FileResponseDto FileToFileResponseDto(File file){
        return FileResponseDto
                .builder()
                .id(file.getFile_id())
                .name(file.getName())
                .path(file.getPath()+file.getFile_id() + "." + file.getType().value())
                .type(file.getType().value())
                .uploadDate(file.getCreatedAt())
                .build();

    }
   public  static TagResponseDto tagToTagResponseDto(Tag tag){
       return TagResponseDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
   }
    public static PostResponseDto postToPostResponseDto(Post post, UserResponseDto userResponseDto) {
        return PostResponseDto
                .builder()
                .id(post.getId())
                .creationDate(post.getCreatedAt())
                .title(post.getTitle())
                .body(post.getBody())
                .tagNames(post.getTags().stream().map(Tag::getName).collect(Collectors.toList()))
                .viewCount(post.getViewCount())
                .updatedAt(post.getUpdatedAt())
                .commentCount((int) post.getComments().stream().count())
                .expertUpVoteCount((int) post.getVotes().stream().filter(vote -> vote.getIsPositive() && vote.getIsByExpert()).count())
                .expertDownVoteCount(((int) post.getVotes().stream().filter(vote -> !vote.getIsPositive() && vote.getIsByExpert()).count()))
                .upVoteCount((int) post.getVotes().stream().filter(vote -> vote.getIsPositive()).count())
                .downVoteCount((int) post.getVotes().stream().filter(vote -> !vote.getIsPositive()).count())
                .poster(userResponseDto)
                .files(post.getFiles().stream().map(EntityToDto::FileToFileResponseDto).collect(Collectors.toList()))
                .build();
    }

    public static CommentResponseDto commentToCommentResponseDto(Comment comment,UserResponseDto userResponseDto){
        return CommentResponseDto
                .builder()
                .id(comment.getId())
                .body(comment.getBody())
                .createdAt(comment.getCreatedAt())
                .upVoteCount((int) comment.getVotes().stream().filter(vote -> vote.getIsPositive()).count())
                .downVoteCount((int) comment.getVotes().stream().filter(vote -> !vote.getIsPositive()).count())
                .commenter(userResponseDto)
                .build();
    }

    public static VoteResponseDto VoteToVoteResponseDto(Vote vote, UserResponseDto userResponseDto){
        return VoteResponseDto
                .builder()
                .createdAt(vote.getCreatedAt())
                .id(vote.getId())
                .isPositive(vote.getIsPositive())
                .isByExpert(vote.getIsByExpert())
                .userResponseDto(userResponseDto)
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
