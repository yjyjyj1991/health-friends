package com.healthfriend.healthfriend.model.DTO.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "UserTokenDto : 사용자의 토큰 정보 객체")
public class UserTokenDto {
    @ApiModelProperty(value = "사용자 고유 값")
    Integer id;
    @ApiModelProperty(value = "사용자의 토큰 정보")
    String token;
}
