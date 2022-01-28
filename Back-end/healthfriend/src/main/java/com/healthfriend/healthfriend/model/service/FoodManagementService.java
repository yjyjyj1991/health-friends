package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Food.FoodDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementListDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementRemoveDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodManagementActivityDto;

public interface FoodManagementService {

  public boolean addFoodManagementActivity(FoodManagementActivityDto foodManagementActivityDto) throws Exception;

  public boolean addFoodManagement(FoodDto foodDto) throws Exception;

  public List<FoodDto> findFoodManagement(FoodManagementListDto foodManagementListDto) throws Exception;

  public boolean removeFoodManagement(FoodManagementRemoveDto foodManagementRemoveDto) throws Exception;

}
