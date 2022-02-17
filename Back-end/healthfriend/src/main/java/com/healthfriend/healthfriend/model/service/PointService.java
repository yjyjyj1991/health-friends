package com.healthfriend.healthfriend.model.service;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Point.PointMyResponseDto;
import com.healthfriend.healthfriend.model.DTO.Point.PointRequestDto;
import com.healthfriend.healthfriend.model.DTO.Point.PointResponseDto;
public interface PointService {
  public boolean addPoint(PointRequestDto pointRequestDto) throws Exception;

  public List<PointResponseDto> findPointTop5() throws Exception;
  public PointMyResponseDto findMyPoint(int userId) throws Exception;
}

