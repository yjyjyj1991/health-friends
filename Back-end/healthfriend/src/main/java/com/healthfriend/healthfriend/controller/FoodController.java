package com.healthfriend.healthfriend.controller;

import java.util.List;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.Food.FoodAddDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodParameterDto;
import com.healthfriend.healthfriend.model.service.FoodService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/foods")
@CrossOrigin
@Api("음식 컨트롤러  API V1")
public class FoodController {
	@Autowired
	private FoodService foodService;
	private static final Logger logger = LoggerFactory.getLogger(FoodController.class);

	@ApiOperation(value = "음식 목록", notes = "음식 정보를 반환한다.", response = List.class)
	@GetMapping()
	public ResponseEntity<Message> foodList(FoodParameterDto foodParameterDto) throws Exception {

		logger.info("foodList - 호출");
		HttpStatus status = HttpStatus.OK;
		Message message = new Message();
		message.setData(foodService.findFood(foodParameterDto));
		message.setSuccess(true);
		return new ResponseEntity<Message>(message, status);
	}

	@ApiOperation(value = "음식 등록", notes = "새로운 음식 정보를 입력한다.", response = String.class)
	@PostMapping
	public ResponseEntity<Message> foodAdd(
			@RequestBody @ApiParam(value = "brand, carb, fat, foodName, kcal, protein, userId", required = true) FoodAddDto foodAddDto)
			throws Exception {
		logger.info("foodAdd - 호출");
		Message message = new Message();
		HttpStatus status = null;
		if (foodService.addFood(foodAddDto)) {
			status = HttpStatus.OK;
			message.setSuccess(true);
			return new ResponseEntity<Message>(message, status);
		}
		message.setSuccess(false);
		status = HttpStatus.NO_CONTENT;
		return new ResponseEntity<Message>(message, status);
	}

	@ApiOperation(value = "음식 상세 보기", notes = "하나의 음식 정보를 가져온다.", response = String.class)
	@GetMapping("/{id}")
	public ResponseEntity<Message> foodDetails(
			@PathVariable("id") int id)
			throws Exception {
		logger.info("foodDetails - 호출");
		Message message = new Message();
		HttpStatus status = null;
		if (foodService.findFoodDetails(id) != null) {
			message.setData(foodService.findFoodDetails(id));
			status = HttpStatus.OK;
			message.setSuccess(true);
			return new ResponseEntity<Message>(message, status);
		}
		message.setSuccess(false);
		status = HttpStatus.NO_CONTENT;
		return new ResponseEntity<Message>(message, status);
	}

}
