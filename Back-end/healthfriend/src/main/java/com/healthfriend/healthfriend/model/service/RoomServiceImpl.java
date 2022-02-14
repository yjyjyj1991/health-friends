package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.RTCSession.RTCSessionInfoDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomDetailResponseDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomJoinUserDto;
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

  @Override
  public RoomDetailResponseDto findRoom(int id) throws Exception {
    return sqlSession.getMapper(RoomMapper.class).selectRoomById(id);
  }

  @Override
  public boolean removeRoom(int id) throws Exception {
    return sqlSession.getMapper(RoomMapper.class).deleteRoom(id);
  }

  @Override
  public boolean joinUser(RoomJoinUserDto roomJoinUserDto) throws Exception {
    return sqlSession.getMapper(RoomMapper.class).joinUser(roomJoinUserDto);
  }

  @Override
  public RoomDetailResponseDto findRoomBySessionName(String sessionName) throws Exception {
    return sqlSession.getMapper(RoomMapper.class).selectRoomBySessionName(sessionName);
  }

  @Override
  public RTCSessionInfoDto findSessionInfo(int id) throws Exception {
    return sqlSession.getMapper(RoomMapper.class).selectSessionInfo(id);
  }

  @Override
  public boolean closeBySessionName(String sessionName) throws Exception {
    return sqlSession.getMapper(RoomMapper.class).closeBySessionName(sessionName);
  }
}
