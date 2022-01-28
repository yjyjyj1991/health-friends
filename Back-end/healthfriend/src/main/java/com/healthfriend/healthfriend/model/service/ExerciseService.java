package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Exercise.ExerciseSelectRequestDto;
import com.healthfriend.healthfriend.model.DTO.Exercise.ExerciseSelectResponseDto;

public interface ExerciseService {

  public List<ExerciseSelectResponseDto> findExercise(ExerciseSelectRequestDto exerciseSelectRequestDto)
      throws Exception;

}
