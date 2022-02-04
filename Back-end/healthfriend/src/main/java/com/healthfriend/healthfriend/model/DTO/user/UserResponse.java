package com.healthfriend.healthfriend.model.DTO.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "UserResponse : 사용자의 전체 정보 객체")
public class UserResponse {
  @ApiModelProperty(value = "사용자 고유 값")
  public Integer id;
  @ApiModelProperty(value = "사용자 이메일")
  public String email;
  @ApiModelProperty(value = "사용자 이름")
  public String name;
  @ApiModelProperty(value = "사용자 닉네임")
  public String nickname;
  @ApiModelProperty(value = "사용자의 운동 목적 고유 값")
  public Integer purposeId;
  @ApiModelProperty(value = "사용자의 운동 목적명")
  public String purpose;
  @ApiModelProperty(value = "사용자 체중")
  public Double weight;
  @ApiModelProperty(value = "사용자 활동량")
  public Double activePoint;
}
