package com.healthfriend.healthfriend.model.DTO.Room;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@ApiModel(value = "RoomDto : 방 정보 객체")
public class RoomDto {
  @ApiModelProperty(value = "방 고유 값")
  private Integer id = null;
  @ApiModelProperty(value = "방 타입의 고유 값")
  private Integer typeId;
  @ApiModelProperty(value = "호스트(유저)의 고유 값")
  private Integer userId;
  @ApiModelProperty(value = "방 제목")
  private String title;
  @ApiModelProperty(value = "방 설명")
  private String content;
  @ApiModelProperty(value = "방 공개 여부")
  private int isPublic;
  @ApiModelProperty(value = "방 패스워드")
  private String password = null;
  @ApiModelProperty(value = "방 채팅")
  private String chat = null;
  @ApiModelProperty(value = "방의 개설 시간")
  private String openTime = null;
  @ApiModelProperty(value = "방 종료 시간")
  private String closeTime = null;
  @ApiModelProperty(value = "방 제한 인원")
  private int limitUser;
  @ApiModelProperty(value = "방 세션")
  private String sessionName;
}
