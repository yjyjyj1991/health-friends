package com.healthfriend.healthfriend.model.DTO.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "UserAccountRequest : 사용자의 계정 정보 객체")
public class UserAccountRequest {
  @ApiModelProperty(value = "사용자 고유 값")
  public Integer id = null;
  @ApiModelProperty(value = "사용자 이메일")
  public String email;
  @ApiModelProperty(value = "사용자 패스워드")
  public String password;
}
