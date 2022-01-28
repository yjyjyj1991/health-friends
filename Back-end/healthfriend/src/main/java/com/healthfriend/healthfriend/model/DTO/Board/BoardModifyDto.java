package com.healthfriend.healthfriend.model.DTO.Board;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "BoardModifyDto : 게시판 수정 정보", description = "하나의 글을 수정하기 위한 정보.")
public class BoardModifyDto {
  @ApiModelProperty(value = "타입 아이디", example = "1")
  Integer typeId;
  @ApiModelProperty(value = "title", example = "제목")
  String title;
  @ApiModelProperty(value = "content", example = "내용")
  String content;
  @ApiModelProperty(value = "0 : 비밀값, 1 : 공개값", example = "0")
  Integer isPublic;
  @ApiModelProperty(value = "비밀번호 isPublic이 1이면 쓰는 곳", example = "string")
  String password;
  @ApiModelProperty(value = "board Id 값", example = "2")
  Integer id;
}
