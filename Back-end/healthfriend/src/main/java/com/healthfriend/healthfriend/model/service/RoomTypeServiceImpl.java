package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.RoomType.RoomTypeResponseDto;
import com.healthfriend.healthfriend.model.mapper.RoomTypeMapper;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomTypeServiceImpl implements RoomTypeService {
  @Autowired
  private SqlSession sqlSession;

  @Override
  public List<RoomTypeResponseDto> findRoomType() throws Exception {
    return sqlSession.getMapper(RoomTypeMapper.class).selectRoomType();
  }
}
