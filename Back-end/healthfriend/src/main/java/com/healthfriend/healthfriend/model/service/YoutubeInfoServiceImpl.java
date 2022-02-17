package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.YoutubeInfo.YoutubeInfoResponseDto;
import com.healthfriend.healthfriend.model.mapper.YoutubeInfoMapper;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class YoutubeInfoServiceImpl implements YoutubeInfoService {
  @Autowired
  private SqlSession sqlSession;

  @Override
  public List<YoutubeInfoResponseDto> getYoutubeInfoListByTypeId(int typeId) throws Exception {
    return sqlSession.getMapper(YoutubeInfoMapper.class).selectYoutubeInfoListByTypeId(typeId);
  }
}
