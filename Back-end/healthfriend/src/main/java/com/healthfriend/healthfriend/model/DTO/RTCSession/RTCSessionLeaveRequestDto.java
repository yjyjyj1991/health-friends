package com.healthfriend.healthfriend.model.DTO.RTCSession;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RTCSessionLeaveRequestDto {
  private String sessionName;
  private String token;
  private String userNickName;
}
