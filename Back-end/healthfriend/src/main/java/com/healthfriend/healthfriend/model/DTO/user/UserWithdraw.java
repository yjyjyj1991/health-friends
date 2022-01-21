package com.healthfriend.healthfriend.model.DTO.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserWithdraw {
  public String email;
  public String password;
  public String withdraw_reason;
}
