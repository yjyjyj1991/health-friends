package com.healthfriend.healthfriend.model.DTO.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserModifyRequest {
  public Integer id;
  public Integer purposeId;
  public String nickname;
  public String password;
  public Double weight;
  public Double activePoint;
}
