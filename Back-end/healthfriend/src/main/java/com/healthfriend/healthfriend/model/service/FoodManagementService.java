package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementListDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementRemoveDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodManagementActivityDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodManagementAddDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodReserveDto;

public interface FoodManagementService {

  public boolean modifyFoodManagementActivity(FoodManagementActivityDto foodManagementActivityDto) throws Exception;

  public boolean addFoodManagement(FoodManagementAddDto foodDto) throws Exception;

  public List<FoodReserveDto> findFoodManagement(FoodManagementListDto foodManagementListDto) throws Exception;

  public boolean removeFoodManagement(FoodManagementRemoveDto foodManagementRemoveDto) throws Exception;

}
