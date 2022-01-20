package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.BoardDto;
import com.healthfriend.healthfriend.model.BoardParameterDto;
import com.healthfriend.healthfriend.util.page.PageNavigation;

public interface BoardService {
    public List<BoardDto> findBoard(BoardParameterDto boardParameterDto) throws Exception;
    public boolean modifyBoard(BoardDto boardDto) throws Exception;
    public boolean removeBoard(BoardDto boardDto) throws Exception;
    public boolean addBoard(BoardDto boardDto) throws Exception;
    public BoardDto findBoardDetail(int id) throws Exception;
    public BoardDto findBoardDetailPassword(BoardDto boardDto) throws Exception;
    public PageNavigation makePageNavigation(BoardParameterDto boardParameterDto) throws Exception;

}
