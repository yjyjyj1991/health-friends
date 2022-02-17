package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Point.PointMyResponseDto;
import com.healthfriend.healthfriend.model.DTO.Point.PointRequestDto;
import com.healthfriend.healthfriend.model.DTO.Point.PointResponseDto;
import com.healthfriend.healthfriend.model.mapper.PointMapper;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class PointServiceImpl implements PointService{
  @Autowired
  private SqlSession sqlSession;
  @Override
  public boolean addPoint(PointRequestDto pointRequestDto) throws Exception {
    return sqlSession.getMapper(PointMapper.class).createPoint(pointRequestDto) > 0;
  }
  @Override
  public List<PointResponseDto> findPointTop5() throws Exception {
    return sqlSession.getMapper(PointMapper.class).selectPointTop5();
  }
  
  public PointMyResponseDto findMyPoint(int userId) throws Exception{
    return sqlSession.getMapper(PointMapper.class).selectMyPoint(userId);
  }
}
