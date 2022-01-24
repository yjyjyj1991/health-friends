package com.healthfriend.healthfriend.model.service;

import com.healthfriend.healthfriend.model.DTO.Comment.CommentAddDto;
import com.healthfriend.healthfriend.model.mapper.CommentMapper;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private SqlSession sqlSession;
    @Override
    public boolean addComment(CommentAddDto commentAddDto) throws Exception {
        // TODO Auto-generated method stub
        return sqlSession.getMapper(CommentMapper.class).createComment(commentAddDto) == 1;
    }
    
}
