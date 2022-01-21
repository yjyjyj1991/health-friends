package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Board.BoardDetailDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardModifyDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardParameterDto;
import com.healthfriend.healthfriend.model.mapper.BoardMapper;
import com.healthfriend.healthfriend.util.page.PageNavigation;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {
  @Autowired
  private SqlSession sqlSession;

  @Override
  public List<BoardDto> findBoard(BoardParameterDto boardParameterDto) throws Exception {
    int start = boardParameterDto.getPg() == 0 ? 0 : (boardParameterDto.getPg() - 1) * boardParameterDto.getSpp();
    boardParameterDto.setStart(start);
    return sqlSession.getMapper(BoardMapper.class).selectBoard(boardParameterDto);
  }

  @Override
  public boolean modifyBoard(BoardModifyDto boardModifyDto) throws Exception {
    return sqlSession.getMapper(BoardMapper.class).updateBoard(boardModifyDto) == 1;
  }

  @Override
  public boolean removeBoard(BoardDto boardDto) throws Exception {
    return sqlSession.getMapper(BoardMapper.class).deleteBoard(boardDto) == 1;
  }

  @Override
  public boolean addBoard(BoardDetailDto boardDetailDto) throws Exception {
    if (boardDetailDto.getTitle() == null || boardDetailDto.getContent() == null) {
      throw new Exception();
    }
    return sqlSession.getMapper(BoardMapper.class).createBoard(boardDetailDto) == 1;
  }

  @Override
  public BoardDto findBoardDetail(int id) throws Exception {
    return sqlSession.getMapper(BoardMapper.class).selectBoardDetail(id);
  }

  @Override
  public BoardDto findBoardDetailPassword(BoardDto boardDto) throws Exception {
    return sqlSession.getMapper(BoardMapper.class).selectBoardDetailPassword(boardDto);

  }

  @Override
  public PageNavigation makePageNavigation(BoardParameterDto boardParameterDto) throws Exception {
    int naviSize = 5;
    PageNavigation pageNavigation = new PageNavigation();
    pageNavigation.setCurrentPage(boardParameterDto.getPg());
    pageNavigation.setNaviSize(naviSize);
    int totalCount = sqlSession.getMapper(BoardMapper.class).selectTotalCount(boardParameterDto);
    pageNavigation.setTotalCount(totalCount);
    int totalPageCount = (totalCount - 1) / boardParameterDto.getSpp() + 1;
    pageNavigation.setTotalPageCount(totalPageCount);
    boolean startRange = boardParameterDto.getPg() <= naviSize;
    pageNavigation.setStartRange(startRange);
    boolean endRange = (totalPageCount - 1) / naviSize * naviSize < boardParameterDto.getPg();
    pageNavigation.setEndRange(endRange);
    pageNavigation.makeNavigator();
    return pageNavigation;
  }

}
