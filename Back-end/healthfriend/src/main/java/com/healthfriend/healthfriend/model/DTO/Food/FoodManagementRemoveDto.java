package com.healthfriend.healthfriend.model.DTO.Food;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodManagementRemoveDto {
  Integer userId;
  String date;
  Integer foodId;
}
