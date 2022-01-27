package com.healthfriend.healthfriend.model.DTO.Room;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "RoomResponseDto : 방 정보 객체")
public class RoomResponseDto extends RoomDto {
  @ApiModelProperty(value = "방 타입(TEXT)")
  private String roomType;
  @ApiModelProperty(value = "호스트 닉네임")
  private String host;
}
