package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Food.FoodDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodParameterDto;
import com.healthfriend.healthfriend.model.mapper.FoodMapper;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoodServiceImpl implements FoodService{
    @Autowired
    private SqlSession sqlSession;

    @Override
    public boolean addFood(FoodDto foodDto) throws Exception {
        if (foodDto.getCarbohydrate() == null || foodDto.getProtein() == null || foodDto.getFat() == null || foodDto.getFoodName() == null) {
            throw new Exception();
          }
          return sqlSession.getMapper(FoodMapper.class).createFood(foodDto) == 1;
          }

    @Override
    public List<FoodDto> findFood(FoodParameterDto foodParameterDto) throws Exception {
        int start = foodParameterDto.getPg() == 0 ? 0 : (foodParameterDto.getPg() - 1) * foodParameterDto.getSpp();
        foodParameterDto.setStart(start);
        return sqlSession.getMapper(FoodMapper.class).selectFood(foodParameterDto);
        }

    @Override
    public FoodDto findFoodDetails(int id) throws Exception {
        return sqlSession.getMapper(FoodMapper.class).selectFoodDetails(id);
    }
  
}
