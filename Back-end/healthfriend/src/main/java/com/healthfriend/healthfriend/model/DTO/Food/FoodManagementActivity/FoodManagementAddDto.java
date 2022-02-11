package com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodManagementAddDto {
  Integer userId;
  Integer foodId;
  Integer servingSize;
}
