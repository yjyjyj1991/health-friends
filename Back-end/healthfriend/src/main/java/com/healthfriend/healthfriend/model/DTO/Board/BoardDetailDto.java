package com.healthfriend.healthfriend.model.DTO.Board;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardDetailDto {
    Integer typeId;
    Integer userId;
    String title;
    String content;
    Integer isPublic;
    String password;
}