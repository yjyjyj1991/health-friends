package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;

import com.healthfriend.healthfriend.model.DTO.RoomDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RoomMapper {
  public int insertRoom(RoomDto roomDto) throws SQLException;
}
