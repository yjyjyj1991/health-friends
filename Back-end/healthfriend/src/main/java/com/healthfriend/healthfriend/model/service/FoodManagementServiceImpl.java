package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Food.FoodDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementListDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementRemoveDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodManagementActivityDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodManagementAddDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodReserveDto;
import com.healthfriend.healthfriend.model.mapper.FoodManagementMapper;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoodManagementServiceImpl implements FoodManagementService {
  @Autowired
  private SqlSession sqlSession;

  @Override
  public boolean modifyFoodManagementActivity(FoodManagementActivityDto foodManagementActivityDto) throws Exception {
    if (foodManagementActivityDto.getUserId() == null || foodManagementActivityDto.getWeight() == null
        || foodManagementActivityDto.getActivePoint() == null
        || foodManagementActivityDto.getPurposeId() == null) {
      throw new Exception();
    }
    return sqlSession.getMapper(FoodManagementMapper.class)
        .updateFoodManagementActivity(foodManagementActivityDto) == 1;
  }

  @Override
  public boolean addFoodManagement(FoodManagementAddDto foodDto) throws Exception {
    if (foodDto.getUserId() == null) {
      throw new Exception();
    }
    if(sqlSession.getMapper(FoodManagementMapper.class).selectFoodUserExist(foodDto) == null){
      sqlSession.getMapper(FoodManagementMapper.class).createFoodUserExist(foodDto); //하나 생성 후 넣음
    }
    return sqlSession.getMapper(FoodManagementMapper.class).createFoodManagement(foodDto) == 1;
  }

  @Override
  public List<FoodReserveDto> findFoodManagement(FoodManagementListDto foodManagementListDto) throws Exception {
    List<FoodReserveDto> list = sqlSession.getMapper(FoodManagementMapper.class).selectFoodManagenent(foodManagementListDto);
    
    //List<FoodReserveDto> list2 = sqlSession.getMapper(FoodManagementMapper.class).selectFoodManagement2(foodManagementListDto);

   
    
    return list;
  }

  @Override
  public boolean removeFoodManagement(FoodManagementRemoveDto foodManagementRemoveDto) throws Exception {
    return sqlSession.getMapper(FoodManagementMapper.class).deleteFoodFromFM(foodManagementRemoveDto) == 1;
  }

}
