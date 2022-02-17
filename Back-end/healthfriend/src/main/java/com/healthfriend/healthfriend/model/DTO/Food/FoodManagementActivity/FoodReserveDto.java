package com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodReserveDto {
  Integer id;
  String foodName;
  Integer carbohydrate;
  Integer protein;
  String brand;
  Integer fat;
  Integer kcal;
  Integer newServing;
  Integer servingSize;
}
