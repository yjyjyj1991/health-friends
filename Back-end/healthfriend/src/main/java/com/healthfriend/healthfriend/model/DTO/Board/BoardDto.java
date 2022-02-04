package com.healthfriend.healthfriend.model.DTO.Board;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardDto {
  Integer id;
  Integer typeId;
  Integer userId;
  String title;
  String content;
  Integer isPublic;
  String password;
  String date;
}
