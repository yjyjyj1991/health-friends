package com.healthfriend.healthfriend.model.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomResponseDto extends RoomDto {
  private String roomType;
  private String host;
}
