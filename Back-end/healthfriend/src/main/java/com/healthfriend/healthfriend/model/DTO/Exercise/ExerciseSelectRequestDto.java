package com.healthfriend.healthfriend.model.DTO.Exercise;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExerciseSelectRequestDto {
  Integer userId;
  String startTime;
  String endTime;
}
