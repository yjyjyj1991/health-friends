package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Purpose.PurposeResponseDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PurposeMapper {
  public List<PurposeResponseDto> selectPurpose() throws SQLException;
}
