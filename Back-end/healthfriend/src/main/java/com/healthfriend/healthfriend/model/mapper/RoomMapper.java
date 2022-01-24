package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Room.RoomDetailResponseDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomDto;
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
}
