package com.healthfriend.healthfriend.model.DTO.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "UserSignup : 회원 가입을 위한 정보 객체")
public class UserSignup {
  @ApiModelProperty(value = "사용자 이메일")
  public String email;
  @ApiModelProperty(value = "사용자 이름")
  public String name;
  @ApiModelProperty(value = "사용자 닉네임")
  public String nickname;
  @ApiModelProperty(value = "사용자 패스워드")
  public String password;
}
