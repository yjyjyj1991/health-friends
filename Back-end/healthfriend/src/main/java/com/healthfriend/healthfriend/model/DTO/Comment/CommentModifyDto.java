package com.healthfriend.healthfriend.model.DTO.Comment;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "CommentModifyDto : 댓글 수정", description = "댓글을 수정하기 위한 필수 정보 모음")
public class CommentModifyDto {
  @ApiModelProperty(value = "댓글 Id", example = "4")
  Integer id;
  @ApiModelProperty(value = "댓글 내용", example = "내용이 들어갑니다")
  String comment;
  @ApiModelProperty(value = "유저 Id 값 (1~N 번째 까지) 댓글 Id에 종속된 유저 Id 여야 수정 가능하다", example = "1")
  Integer userId;
}
