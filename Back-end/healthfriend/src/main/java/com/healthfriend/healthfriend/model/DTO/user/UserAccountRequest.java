package com.healthfriend.healthfriend.model.DTO.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAccountRequest {
  public Integer id = null;
  public String email;
  public String password;
}
