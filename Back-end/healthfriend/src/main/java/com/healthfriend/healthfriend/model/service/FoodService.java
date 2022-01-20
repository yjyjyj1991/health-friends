package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.FoodDto;
import com.healthfriend.healthfriend.model.DTO.FoodParameterDto;

public interface FoodService {

   

    public List<FoodDto> findFood(FoodParameterDto foodParameterDto)throws Exception;

    public boolean addFood(FoodDto foodDto)throws Exception;

}
