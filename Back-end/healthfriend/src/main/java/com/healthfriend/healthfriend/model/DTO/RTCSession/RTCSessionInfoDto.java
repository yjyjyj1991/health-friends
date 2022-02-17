package com.healthfriend.healthfriend.model.DTO.RTCSession;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RTCSessionInfoDto {
  private int id;
  private int typeId;
  private String nickname;
  private String sessionName;
  private String token = null;
  private Integer limitUser;
  private Integer userCount;
  private String closeTime;
  private String type;
}
