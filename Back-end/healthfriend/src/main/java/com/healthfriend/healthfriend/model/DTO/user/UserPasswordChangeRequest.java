package com.healthfriend.healthfriend.model.DTO.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "UserPasswordChangeRequest : 사용자의 패스워드 수정을 위한 객체")
public class UserPasswordChangeRequest {
  @ApiModelProperty(value = "사용자 고유 값")
  int id;
  @ApiModelProperty(value = "사용자 기존 패스워드")
  String oldPassword;
  @ApiModelProperty(value = "변경할 패스워드")
  String newPassword;
}
