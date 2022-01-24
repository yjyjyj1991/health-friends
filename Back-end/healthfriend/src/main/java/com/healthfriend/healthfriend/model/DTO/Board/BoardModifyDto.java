package com.healthfriend.healthfriend.model.DTO.Board;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardModifyDto {
    Integer typeId;
    String title;
    String content;
    Integer isPublic;
    String password;
    Integer id;
}
