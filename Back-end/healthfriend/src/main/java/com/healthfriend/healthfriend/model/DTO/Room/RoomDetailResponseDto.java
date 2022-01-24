package com.healthfriend.healthfriend.model.DTO.Room;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomDetailResponseDto {
  private Integer id;
  private Integer typeId;
  private Integer userId;
  private String type;
  private String host;
  private String title;
  private String content;
  private Integer isPublic;
  private String password;
  private String openTime;
  private Integer limitUser;
}
