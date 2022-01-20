package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.BoardDto;
import com.healthfriend.healthfriend.model.DTO.BoardParameterDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {

    public int createBoard(BoardDto boardDto) throws SQLException;

    public List<BoardDto> selectBoard(BoardParameterDto boardParameterDto) throws SQLException;

    public int deleteBoard(BoardDto boardDto) throws SQLException;

    public int updateBoard(BoardDto boardDto) throws SQLException;

    public BoardDto selectBoardDetail(int id) throws SQLException;

    public BoardDto selectBoardDetailPassword(BoardDto boardDto) throws SQLException;

    public int selectTotalCount(BoardParameterDto boardParameterDto) throws SQLException;
}
