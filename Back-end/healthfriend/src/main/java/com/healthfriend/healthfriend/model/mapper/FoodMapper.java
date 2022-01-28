package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Food.FoodAddDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodParameterDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FoodMapper {

    public List<FoodDto> selectFood(FoodParameterDto foodParameterDto) throws SQLException;

    public int createFood(FoodAddDto foodAddDto) throws SQLException;

    public FoodDto selectFoodDetails(int id) throws SQLException;

}
