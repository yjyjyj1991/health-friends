package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Room.RoomDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomModifyRequestDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomResponseDto;
import com.healthfriend.healthfriend.model.mapper.RoomMapper;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomServiceImpl implements RoomService {
  @Autowired
  private SqlSession sqlSession;

  @Override
  public boolean addRoom(RoomDto roomDto) throws Exception {
    return sqlSession.getMapper(RoomMapper.class).insertRoom(roomDto) > 0;
  }

  @Override
  public List<RoomResponseDto> findRoom() throws Exception {
    return sqlSession.getMapper(RoomMapper.class).selectRoom();
  }

  @Override
  public List<RoomResponseDto> findRoom(String title) throws Exception {
    return sqlSession.getMapper(RoomMapper.class).selectRoomByTitle(title);
  }

  @Override
  public boolean modifyRoom(RoomModifyRequestDto roomModifyRequestDto) throws Exception {
    return sqlSession.getMapper(RoomMapper.class).updateRoom(roomModifyRequestDto);
  }
}
