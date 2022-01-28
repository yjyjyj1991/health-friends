package com.healthfriend.healthfriend.model.DTO.Comment;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "CommentRemoveDto : 댓글 삭제", description = "댓글을 삭제하기 위한 필수 정보 모음")
public class CommentRemoveDto {
  @ApiModelProperty(value = "유저 Id", example = "1")
  Integer userId;
  @ApiModelProperty(value = "해당 게시글 Id", example = "3")
  Integer boardId;
  @ApiModelProperty(value = "댓글 Id", example = "4")
  Integer id;
}