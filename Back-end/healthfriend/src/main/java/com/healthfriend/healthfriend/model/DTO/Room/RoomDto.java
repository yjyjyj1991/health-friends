package com.healthfriend.healthfriend.model.DTO.Room;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomDto {
  private Integer id = null;
  private int typeId;
  private int userId;
  private String title;
  private String content;
  private int isPublic;
  private String password = null;
  private String chat = null;
  private String openTime = null;
  private String closeTime = null;
  private int limitUser;
}
