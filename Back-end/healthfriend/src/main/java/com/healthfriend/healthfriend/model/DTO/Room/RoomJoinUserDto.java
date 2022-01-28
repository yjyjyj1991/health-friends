package com.healthfriend.healthfriend.model.DTO.Room;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
@ApiModel(value = "RoomJoinUserDto : 방에 참가한 유저 정보 객체")
public class RoomJoinUserDto {
  @ApiModelProperty(value = "방 고유 값")
  private Integer roomId = null;
  @ApiModelProperty(value = "사용자 고유 값")
  private Integer userId = null;
}
