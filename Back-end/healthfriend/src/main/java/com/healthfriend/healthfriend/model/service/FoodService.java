package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Food.FoodAddDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodParameterDto;

public interface FoodService {

  public List<FoodDto> findFood(FoodParameterDto foodParameterDto) throws Exception;

  public boolean addFood(FoodAddDto foodAddDto) throws Exception;

  public FoodDto findFoodDetails(int id) throws Exception;

}
