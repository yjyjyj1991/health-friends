package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.RoomType.RoomTypeResponseDto;

public interface RoomTypeService {
  public List<RoomTypeResponseDto> findRoomType() throws Exception;
}
