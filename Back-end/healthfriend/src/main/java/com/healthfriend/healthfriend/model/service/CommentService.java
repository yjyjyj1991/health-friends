package com.healthfriend.healthfriend.model.service;

import com.healthfriend.healthfriend.model.DTO.Comment.CommentAddDto;

public interface CommentService {

  public boolean addComment(CommentAddDto commentAddDto) throws Exception;

}
