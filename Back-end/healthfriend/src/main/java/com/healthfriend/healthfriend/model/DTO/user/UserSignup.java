package com.healthfriend.healthfriend.model.DTO.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignup {
  public String email;
  public String name;
  public String nickname;
  public String password;
  public Integer purposeId;
  public Double weight;
  public Double activePoint;
}
