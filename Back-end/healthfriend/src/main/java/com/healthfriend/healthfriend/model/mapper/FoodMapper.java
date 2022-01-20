package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.FoodDto;
import com.healthfriend.healthfriend.model.DTO.FoodParameterDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FoodMapper {

    public List<FoodDto> selectFood(FoodParameterDto foodParameterDto) throws SQLException;

    public int createFood(FoodDto foodDto) throws SQLException;

}
