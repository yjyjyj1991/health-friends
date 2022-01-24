package com.healthfriend.healthfriend.model.DTO.Comment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentModifyDto {
    Integer id;
    String comment;
    Integer userId;
}
