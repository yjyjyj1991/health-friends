package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Exercise.ExerciseSelectRequestDto;
import com.healthfriend.healthfriend.model.DTO.Exercise.ExerciseSelectResponseDto;
import com.healthfriend.healthfriend.model.mapper.ExerciseMapper;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExerciseServiceImpl implements ExerciseService {

  @Autowired
  private SqlSession sqlSession;

  @Override
  public List<ExerciseSelectResponseDto> findExercise(ExerciseSelectRequestDto exerciseSelectRequestDto)
      throws Exception {
    if (exerciseSelectRequestDto.getUserId() == null || exerciseSelectRequestDto.getStartTime() == null
        || exerciseSelectRequestDto.getEndTime() == null)
      throw new Exception();
    return sqlSession.getMapper(ExerciseMapper.class).selectExercise(exerciseSelectRequestDto);
  }

}
