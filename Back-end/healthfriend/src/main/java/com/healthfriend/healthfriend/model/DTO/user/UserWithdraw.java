package com.healthfriend.healthfriend.model.DTO.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "UserWithdraw : 회원 탈퇴 처리를 위한 정보 객체")
public class UserWithdraw {
  @ApiModelProperty(value = "사용자 고유 값")
  public Integer id;
  @ApiModelProperty(value = "사용자의 탈퇴 사유")
  public String withdrawReason;
}
