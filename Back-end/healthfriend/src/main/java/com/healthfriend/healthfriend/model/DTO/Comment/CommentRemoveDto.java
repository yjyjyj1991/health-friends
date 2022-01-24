package com.healthfriend.healthfriend.model.DTO.Comment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRemoveDto {
    Integer userId;
    Integer boardId;
    Integer id;
}