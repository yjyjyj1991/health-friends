package com.healthfriend.healthfriend.model.DTO.RoomType;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "RoomTypeResponseDto : 방의 타입(요가, 헬스 등) 정보 객체")
public class RoomTypeResponseDto {
  @ApiModelProperty(value = "방 타입의 고유 값")
  private Integer id;
  @ApiModelProperty(value = "방 타입(TEXT)")
  private String type;
}
