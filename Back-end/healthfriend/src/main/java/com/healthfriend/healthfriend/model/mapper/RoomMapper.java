package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.RTCSession.RTCSessionInfoDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomDetailResponseDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomJoinUserDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomModifyRequestDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomResponseDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RoomMapper {
  public int insertRoom(RoomDto roomDto) throws SQLException;

  public List<RoomResponseDto> selectRoom() throws SQLException;

  public List<RoomResponseDto> selectRoomByTitle(String title) throws SQLException;

  public boolean updateRoom(RoomModifyRequestDto roomModifyRequestDto) throws SQLException;

  public RoomDetailResponseDto selectRoomById(int id) throws SQLException;

  public RoomDetailResponseDto selectRoomBySessionName(String sessionName) throws SQLException;

  public boolean deleteRoom(int id) throws SQLException;

  public boolean joinUser(RoomJoinUserDto roomJoinUserDto) throws SQLException;

  public RTCSessionInfoDto selectSessionInfo(int id) throws SQLException;

  public boolean closeBySessionName(String sessionName) throws SQLException;
}
