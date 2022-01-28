package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Board.BoardDetailDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardModifyDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardParameterDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardRemoveDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {

    public int createBoard(BoardDetailDto boardDetailDto) throws SQLException;

    public List<BoardDto> selectBoard(BoardParameterDto boardParameterDto) throws SQLException;

    public int deleteBoard(BoardDto boardDto) throws SQLException;

    public int updateBoard(BoardModifyDto boardModifyDto) throws SQLException;

    public BoardDto selectBoardDetail(int id) throws SQLException;

    public BoardDto selectBoardDetailPassword(BoardRemoveDto boardRemoveDto) throws SQLException;

    public int selectTotalCount(BoardParameterDto boardParameterDto) throws SQLException;
}
