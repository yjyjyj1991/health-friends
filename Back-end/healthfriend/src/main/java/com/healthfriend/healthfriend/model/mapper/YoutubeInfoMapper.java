package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.YoutubeInfo.YoutubeInfoResponseDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface YoutubeInfoMapper {
  public List<YoutubeInfoResponseDto> selectYoutubeInfoListByTypeId(int typeId) throws SQLException;
}
