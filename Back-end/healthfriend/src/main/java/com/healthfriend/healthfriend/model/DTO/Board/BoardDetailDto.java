package com.healthfriend.healthfriend.model.DTO.Board;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "BoardDetailDto : 게시판 상세 정보", description = "하나의 글을 작성하기 위한 상세 파라미터정보.")
public class BoardDetailDto {
  @ApiModelProperty(value = "타입 아이디", example = "1")
  Integer typeId;
  @ApiModelProperty(value = "유저 id 값 몇 번째 유저인지", example = "1")
  Integer userId;
  @ApiModelProperty(value = "title", example = "제목")
  String title;
  @ApiModelProperty(value = "content", example = "내용")
  String content;
  @ApiModelProperty(value = "isPublic 0 공개글 1 비밀글", example = "0")
  Integer isPublic;
  @ApiModelProperty(value = "isPublic이 1일때만 설정하는 비밀번호", example = "string")
  String password;
}