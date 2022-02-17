package com.healthfriend.healthfriend.model.DTO.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "UserModifyRequest : 사용자의 정보 수정을 위한 객체")
public class UserModifyRequest {
  @ApiModelProperty(value = "사용자 고유 값")
  public Integer id;
  @ApiModelProperty(value = "사용자의 운동 목적 고유 값")
  public Integer purposeId;
  @ApiModelProperty(value = "사용자 체중")
  public Double weight;
  @ApiModelProperty(value = "사용자 활동량")
  public Double activePoint;
}
