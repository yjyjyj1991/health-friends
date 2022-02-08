package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Board.BoardDetailDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardModifyDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardParameterDto;
import com.healthfriend.healthfriend.model.DTO.Board.BoardRemoveDto;
import com.healthfriend.healthfriend.model.DTO.Comment.CommentAddDto;
import com.healthfriend.healthfriend.model.DTO.Comment.CommentModifyDto;
import com.healthfriend.healthfriend.model.DTO.Comment.CommentRemoveDto;
import com.healthfriend.healthfriend.model.mapper.BoardMapper;
import com.healthfriend.healthfriend.model.mapper.CommentMapper;
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
    //boardDetailDto.setContent(boardDetailDto.getContent().replace("\r\n","\n"));
    return sqlSession.getMapper(BoardMapper.class).createBoard(boardDetailDto) == 1;
  }

  @Override
  public BoardDto findBoardDetail(int id) throws Exception {
    return sqlSession.getMapper(BoardMapper.class).selectBoardDetail(id);
  }

  @Override
  public BoardDto findBoardDetailPassword(BoardRemoveDto boardRemoveDto) throws Exception {
    return sqlSession.getMapper(BoardMapper.class).selectBoardDetailPassword(boardRemoveDto);

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

  @Override
  public boolean addComment(CommentAddDto commentAddDto) throws Exception {
    return sqlSession.getMapper(CommentMapper.class).createComment(commentAddDto) == 1;
  }

  @Override
  public List<CommentAddDto> findCommentDetail(int boardid) throws Exception {
    return sqlSession.getMapper(CommentMapper.class).selectComment(boardid);
  }

  @Override
  public boolean removeComment(CommentRemoveDto commentRemoveDto) throws Exception {
    return sqlSession.getMapper(CommentMapper.class).deleteCommet(commentRemoveDto) == 1;
  }

  @Override
  public boolean modifyComment(CommentModifyDto commentModifyDto) throws Exception {
    return sqlSession.getMapper(CommentMapper.class).updateComment(commentModifyDto) == 1;
  }

}
