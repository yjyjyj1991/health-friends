package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Comment.CommentAddDto;
import com.healthfriend.healthfriend.model.DTO.Comment.CommentModifyDto;
import com.healthfriend.healthfriend.model.DTO.Comment.CommentRemoveDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommentMapper {

    public int createComment(CommentAddDto commentAddDto) throws SQLException;

    public List<CommentAddDto> selectComment(int boardid) throws SQLException;

    public int deleteCommet(CommentRemoveDto commentRemoveDto) throws SQLException;

    public int updateComment(CommentModifyDto commentModifyDto) throws SQLException;

}
