package com.healthfriend.healthfriend.model.DTO.Food;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodManagementDto {
  Integer id;
  Integer userId;
  Integer purposeId;
  String date;
  Double weight;
  Double activePoint;
}
