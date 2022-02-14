package com.healthfriend.healthfriend.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementListDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementRemoveDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodManagementActivityDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodManagementAddDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodReserveDto;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FoodManagementMapper {

    int updateFoodManagementActivity(FoodManagementActivityDto foodManagementActivityDto) throws SQLException;

    int createFoodManagement(FoodManagementAddDto foodManagementAddDto) throws SQLException;

    List<FoodReserveDto> selectFoodManagenent(FoodManagementListDto foodManagementListDto) throws SQLException;

    int deleteFoodFromFM(FoodManagementRemoveDto foodManagementRemoveDto) throws SQLException;

    List<FoodReserveDto> selectFoodManagement2(FoodManagementListDto foodManagementListDto) throws SQLException;

    Integer selectFoodUserExist(FoodManagementAddDto foodManagementAddDto) throws SQLException;

    Integer createFoodUserExist(FoodManagementAddDto foodManagementAddDto) throws SQLException;
}
