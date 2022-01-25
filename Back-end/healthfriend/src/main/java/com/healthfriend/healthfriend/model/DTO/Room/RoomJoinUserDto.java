package com.healthfriend.healthfriend.model.DTO.Room;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class RoomJoinUserDto {
  private Integer roomId = null;
  private Integer userId = null;
}
