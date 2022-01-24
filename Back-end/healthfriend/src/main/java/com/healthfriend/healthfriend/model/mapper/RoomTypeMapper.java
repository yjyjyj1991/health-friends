package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.RoomType.RoomTypeResponseDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RoomTypeMapper {
  public List<RoomTypeResponseDto> selectRoomType() throws SQLException;
}
