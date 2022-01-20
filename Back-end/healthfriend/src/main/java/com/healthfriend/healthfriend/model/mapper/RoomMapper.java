package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.RoomDto;
import com.healthfriend.healthfriend.model.DTO.RoomResponseDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RoomMapper {
  public int insertRoom(RoomDto roomDto) throws SQLException;

  public List<RoomResponseDto> selectRoom() throws SQLException;

  public List<RoomResponseDto> selectRoomByTitle(String title) throws SQLException;
}
