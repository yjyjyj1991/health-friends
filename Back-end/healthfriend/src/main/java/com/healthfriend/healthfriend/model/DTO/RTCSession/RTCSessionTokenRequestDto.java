package com.healthfriend.healthfriend.model.DTO.RTCSession;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class RTCSessionTokenRequestDto {
  private String sessionName;
  private String userNickName;
}
