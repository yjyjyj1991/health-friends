package com.healthfriend.healthfriend.model.DTO.Room;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomModifyRequestDto {
  private Integer id;
  private Integer userId;
  private String title;
  private String content;
  private Integer isPublic;
  private String password;
  private Integer limitUser;
}
