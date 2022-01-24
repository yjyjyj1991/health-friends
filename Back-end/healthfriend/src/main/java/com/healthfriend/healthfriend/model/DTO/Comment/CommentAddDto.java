package com.healthfriend.healthfriend.model.DTO.Comment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentAddDto {
    Integer userId;
    String comment;
    Integer boardId;
}
