package com.healthfriend.healthfriend.model.DTO.Room;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomResponseDto extends RoomDto {
  private String roomType;
  private String host;
}
