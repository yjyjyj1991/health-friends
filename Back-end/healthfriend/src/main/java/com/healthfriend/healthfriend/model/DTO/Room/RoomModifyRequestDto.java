package com.healthfriend.healthfriend.model.DTO.Room;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomModifyRequestDto {
  @ApiModelProperty(value = "방 고유 값")
  private Integer id;
  @ApiModelProperty(value = "호스트(사용자) 고유 값")
  private Integer userId;
  @ApiModelProperty(value = "방 제목")
  private String title;
  @ApiModelProperty(value = "방 설명")
  private String content;
  @ApiModelProperty(value = "방 공개 여부")
  private Integer isPublic;
  @ApiModelProperty(value = "방 패스워드")
  private String password;
  @ApiModelProperty(value = "방 제한 인원")
  private Integer limitUser;
}
