package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Exercise.ExerciseSelectRequestDto;
import com.healthfriend.healthfriend.model.DTO.Exercise.ExerciseSelectResponseDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ExerciseMapper {

    public List<ExerciseSelectResponseDto> selectExercise(ExerciseSelectRequestDto exerciseSelectRequestDto)
            throws SQLException;

}
