package com.healthfriend.healthfriend.model.DTO.Session;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SessionRequestDto {
  private String sessionName;
  private String userName;
}
