package com.healthfriend.healthfriend.controller;

import java.util.List;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.Exercise.ExerciseSelectRequestDto;
import com.healthfriend.healthfriend.model.service.ExerciseService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/exercise")
@CrossOrigin
@Api("운동 일정 컨트롤러  API V1")
public class ExerciseController {
  @Autowired
  private ExerciseService exerciseService;
  private static final Logger logger = LoggerFactory.getLogger(ExerciseController.class);

  @ApiOperation(value = "운동 목록", notes = "나의 운동 정보를 반환한다.", response = List.class)
  @GetMapping()
  public ResponseEntity<Message> exerciseList(ExerciseSelectRequestDto exerciseSelectRequestDto) throws Exception {
    logger.info("exerciseList - 호출");
    HttpStatus status = HttpStatus.OK;
    Message message = new Message();
    message.setData(exerciseService.findExercise(exerciseSelectRequestDto));
    message.setSuccess(true);
    return new ResponseEntity<Message>(message, status);
  }

}