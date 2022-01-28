package com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodManagementActivityDto {
  Integer userId;
  Integer purposeId;
  Double weight;
  Double activePoint;
}
