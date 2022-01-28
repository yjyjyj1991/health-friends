package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Purpose.PurposeResponseDto;

public interface PurposeService {
  public List<PurposeResponseDto> findPurpose() throws Exception;
}
