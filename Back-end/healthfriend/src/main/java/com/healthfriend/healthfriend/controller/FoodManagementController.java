package com.healthfriend.healthfriend.controller;

import java.util.List;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.Food.FoodDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementListDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementRemoveDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodManagementActivityDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodManagementAddDto;
import com.healthfriend.healthfriend.model.DTO.Food.FoodManagementActivity.FoodReserveDto;
import com.healthfriend.healthfriend.model.service.FoodManagementService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/foodmanagement")
@CrossOrigin
@Api("식단 관리 컨트롤러  API V1")
public class FoodManagementController {
	@Autowired
	private FoodManagementService foodManagementService;
	private static final Logger logger = LoggerFactory.getLogger(FoodManagementController.class);

	@ApiOperation(value = "활동량 수정", notes = "기존 활동량 정보를 수정한다.", response = String.class)
	@PutMapping("/activity")
	public ResponseEntity<Message> foodManagementActivityModify(
			@RequestBody FoodManagementActivityDto foodManagementActivityDto)
			throws Exception {
		logger.info("foodManagementActivityAdd - 호출");
		Message message = new Message();
		HttpStatus status = null;
		if (foodManagementService.modifyFoodManagementActivity(foodManagementActivityDto)) {
			status = HttpStatus.OK;
			message.setSuccess(true);
			return new ResponseEntity<Message>(message, status);
		}
		message.setSuccess(false);
		status = HttpStatus.NO_CONTENT;
		return new ResponseEntity<Message>(message, status);
	}

	@ApiOperation(value = "식단 가져오기", notes = "새로운 나의 개인 식단을 가져온다.", response = String.class)
	@GetMapping
	public ResponseEntity<Message> foodManagementList(
			 FoodManagementListDto foodManagementListDto)
			throws Exception {
		logger.info("foodManagementList - 호출");
		Message message = new Message();
		HttpStatus status = null;
		List<FoodReserveDto> list = foodManagementService.findFoodManagement(foodManagementListDto);
		if (list.isEmpty()) {
			message.setSuccess(false);
			status = HttpStatus.NO_CONTENT;
			return new ResponseEntity<Message>(message, status);
		} else {
			message.setData(list);
			status = HttpStatus.OK;
			message.setSuccess(true);
			return new ResponseEntity<Message>(message, status);
		}

	}

	@ApiOperation(value = "식단 정보 저장", notes = "나만의 개인 식품을  DB로 추가한다.", response = String.class)
	@PostMapping
	public ResponseEntity<Message> foodManagementAdd(
			@RequestBody FoodManagementAddDto foodDto)
			throws Exception {
		logger.info("foodManagementAdd - 호출");
		Message message = new Message();
		HttpStatus status = null;

		if (foodManagementService.addFoodManagement(foodDto)) {
			status = HttpStatus.OK;
			message.setSuccess(true);
			return new ResponseEntity<Message>(message, status);
		}
		message.setSuccess(false);
		status = HttpStatus.NO_CONTENT;
		return new ResponseEntity<Message>(message, status);
	}

	@ApiOperation(value = "식단 정보 삭제", notes = "나만의 개인 식품을 삭제한다.", response = String.class)
	@DeleteMapping
	public ResponseEntity<Message> foodManagementRemove(
			@RequestBody FoodManagementRemoveDto foodManagementRemoveDto)
			throws Exception {
		logger.info("foodManagementAdd - 호출");
		Message message = new Message();
		HttpStatus status = null;

		if (foodManagementService.removeFoodManagement(foodManagementRemoveDto)) {
			status = HttpStatus.OK;
			message.setSuccess(true);
			return new ResponseEntity<Message>(message, status);
		}
		message.setSuccess(false);
		status = HttpStatus.NO_CONTENT;
		return new ResponseEntity<Message>(message, status);
	}

}
