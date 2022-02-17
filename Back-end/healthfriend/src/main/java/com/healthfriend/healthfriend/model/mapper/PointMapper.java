package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Point.PointMyResponseDto;
import com.healthfriend.healthfriend.model.DTO.Point.PointRequestDto;
import com.healthfriend.healthfriend.model.DTO.Point.PointResponseDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PointMapper {
  public int createPoint(PointRequestDto pointRequestDto) throws SQLException;

  public List<PointResponseDto> selectPointTop5() throws SQLException;

  public PointMyResponseDto selectMyPoint(int id) throws SQLException;
}
