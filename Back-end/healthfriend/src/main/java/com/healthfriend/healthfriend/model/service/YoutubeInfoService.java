package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.YoutubeInfo.YoutubeInfoResponseDto;

public interface YoutubeInfoService {
  public List<YoutubeInfoResponseDto> getYoutubeInfoListByTypeId(int typeId) throws Exception;
}
