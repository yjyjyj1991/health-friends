package com.healthfriend.healthfriend.model.DTO.Point;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointRequestDto {
  Integer point;
  Integer userId;
  String reason;
  String startTime;
  String endTime;
}
