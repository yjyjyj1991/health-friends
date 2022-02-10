package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Food.FoodDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementListDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementRemoveDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodManagementActivityDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodManagementAddDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FoodManagementMapper {

    int updateFoodManagementActivity(FoodManagementActivityDto foodManagementActivityDto) throws SQLException;

    int createFoodManagement(FoodManagementAddDto foodManagementAddDto) throws SQLException;

    List<FoodDto> selectFoodManagenent(FoodManagementListDto foodManagementListDto) throws SQLException;

    int deleteFoodManagement(FoodManagementRemoveDto foodManagementRemoveDto) throws SQLException;

}
