package com.healthfriend.healthfriend.model.DTO.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
  public Integer Id;
  public String email;
  public String name;
  public String nickname;
  public Integer purposeId;
  public String purposeName;
  public Double weight;
  public Double activePoint;
}
