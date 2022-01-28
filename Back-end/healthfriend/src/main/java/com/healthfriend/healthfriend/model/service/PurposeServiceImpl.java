package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Purpose.PurposeResponseDto;
import com.healthfriend.healthfriend.model.mapper.PurposeMapper;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PurposeServiceImpl implements PurposeService {
  @Autowired
  private SqlSession sqlSession;

  @Override
  public List<PurposeResponseDto> findPurpose() throws Exception {
    return sqlSession.getMapper(PurposeMapper.class).selectPurpose();
  }
}
