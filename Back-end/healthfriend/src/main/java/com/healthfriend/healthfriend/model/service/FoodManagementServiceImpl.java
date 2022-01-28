package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Food.FoodDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementListDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementRemoveDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodManagementActivityDto;
import com.healthfriend.healthfriend.model.mapper.FoodManagementMapper;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoodManagementServiceImpl implements FoodManagementService {
  @Autowired
  private SqlSession sqlSession;

  @Override
  public boolean addFoodManagementActivity(FoodManagementActivityDto foodManagementActivityDto) throws Exception {
    if (foodManagementActivityDto.getUserId() == null || foodManagementActivityDto.getWeight() == null
        || foodManagementActivityDto.getActivePoint() == null
        || foodManagementActivityDto.getPurposeId() == null) {
      throw new Exception();
    }
    return sqlSession.getMapper(FoodManagementMapper.class)
        .createFoodManagementActivity(foodManagementActivityDto) == 1;
  }

  @Override
  public boolean addFoodManagement(FoodDto foodDto) throws Exception {
    if (foodDto.getUserId() == null) {
      throw new Exception();
    }
    return sqlSession.getMapper(FoodManagementMapper.class).createFoodManagement(foodDto) == 1;
  }

  @Override
  public List<FoodDto> findFoodManagement(FoodManagementListDto foodManagementListDto) throws Exception {
    return sqlSession.getMapper(FoodManagementMapper.class).selectFoodManagenent(foodManagementListDto);
  }

  @Override
  public boolean removeFoodManagement(FoodManagementRemoveDto foodManagementRemoveDto) throws Exception {
    return sqlSession.getMapper(FoodManagementMapper.class).deleteFoodManagement(foodManagementRemoveDto) == 1;
  }

}
