package com.healthfriend.healthfriend.model.DTO.Food;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodDto {
  Integer id;
  Integer userId;
  String foodName;
  Integer carbohydrate;
  Integer protein;
  String brand;
  Integer fat;
  Integer kcal;
  Integer servingSize;
}
