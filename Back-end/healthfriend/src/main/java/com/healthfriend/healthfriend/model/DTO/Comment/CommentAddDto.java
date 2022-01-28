package com.healthfriend.healthfriend.model.DTO.Comment;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "CommentAddDto : 댓글 등록", description = "댓글을 등록하기 위한 것들")
public class CommentAddDto {
  @ApiModelProperty(value = "유저 Id", example = "1")
  Integer userId;
  @ApiModelProperty(value = "댓글 내용", example = "내용")
  String comment;
  @ApiModelProperty(value = "게시글 Id", example = "3")
  Integer boardId;
}
