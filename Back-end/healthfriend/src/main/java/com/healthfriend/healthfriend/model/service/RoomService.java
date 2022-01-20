package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.RoomDto;
import com.healthfriend.healthfriend.model.DTO.RoomResponseDto;

public interface RoomService {
  public boolean addRoom(RoomDto room) throws Exception;

  public List<RoomResponseDto> findRoom() throws Exception;

  public List<RoomResponseDto> findRoom(String title) throws Exception;
}
