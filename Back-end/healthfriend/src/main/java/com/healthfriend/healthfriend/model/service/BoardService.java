package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Board.BoardDetailDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardModifyDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardParameterDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardRemoveDto;
import com.healthfriend.healthfriend.util.page.PageNavigation;

public interface BoardService {
  public List<BoardDto> findBoard(BoardParameterDto boardParameterDto)
      throws Exception;

  public boolean modifyBoard(BoardModifyDto boardModifyDto) throws Exception;

  public boolean removeBoard(BoardDto boardDto) throws Exception;

  public boolean addBoard(BoardDetailDto boardDetailDto) throws Exception;

  public BoardDto findBoardDetail(int id) throws Exception;

  public BoardDto findBoardDetailPassword(BoardRemoveDto boardRemoveDto) throws Exception;

  public PageNavigation makePageNavigation(BoardParameterDto boardParameterDto) throws Exception;

}
