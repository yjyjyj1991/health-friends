package com.healthfriend.healthfriend.model.DTO.Board;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "BoardRemoveDto : 비밀글 정보", description = "하나의 비밀글을 접근하기 위한 정보.")
public class BoardRemoveDto {
  @ApiModelProperty(value = "board Id", example = "4")
  Integer id;
  @ApiModelProperty(value = "해당 게시글의 비밀번호를 입력하시오", example = "1233333334")
  String password;
}
