package com.healthfriend.healthfriend.model.DTO.Room;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "RoomDetailResponseDto : 방의 상세 정보 조회")
public class RoomDetailResponseDto {
  @ApiModelProperty(value = "방의 고유 값")
  private Integer id;
  @ApiModelProperty(value = "방 타입의 고유 값")
  private Integer typeId;
  @ApiModelProperty(value = "호스트(유저)의 고유 값")
  private Integer userId;
  @ApiModelProperty(value = "방 타입(TEXT)")
  private String type;
  @ApiModelProperty(value = "호스트 닉네임")
  private String host;
  @ApiModelProperty(value = "방 제목")
  private String title;
  @ApiModelProperty(value = "방 설명")
  private String content;
  @ApiModelProperty(value = "방 공개 여부")
  private Integer isPublic;
  @ApiModelProperty(value = "방 패스워드")
  private String password;
  @ApiModelProperty(value = "방 개설 시간")
  private String openTime;
  @ApiModelProperty(value = "방 종료 시간")
  private String closeTime;
  @ApiModelProperty(value = "방 제한 인원")
  private Integer limitUser;
  @ApiModelProperty(value = "방 세션")
  private String sessionName;
}
