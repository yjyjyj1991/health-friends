package com.healthfriend.healthfriend.model.DTO.RTCSession;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RTCSessionTokenRequestDto {
  private String sessionName;
  private String userNickName;
}
