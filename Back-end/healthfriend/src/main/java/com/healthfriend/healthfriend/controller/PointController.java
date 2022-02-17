package com.healthfriend.healthfriend.controller;


import java.util.List;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.Point.PointMyResponseDto;
import com.healthfriend.healthfriend.model.DTO.Point.PointRequestDto;
import com.healthfriend.healthfriend.model.DTO.Point.PointResponseDto;
import com.healthfriend.healthfriend.model.service.PointService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/point")
@CrossOrigin
@Api("점수 컨트롤러")
public class PointController {

  @Autowired
	private PointService pointService;
  
  @PostMapping("")
  public ResponseEntity<Message> PointAdd(@RequestBody PointRequestDto pointRequestDto) throws Exception {
    Message message = new Message();
		HttpStatus status = null;
		if (pointService.addPoint(pointRequestDto)) {
			status = HttpStatus.OK;
			message.setSuccess(true);
			return new ResponseEntity<Message>(message, status);
		}
		message.setSuccess(false);
		status = HttpStatus.NO_CONTENT;
		return new ResponseEntity<Message>(message, status);

  }

	@GetMapping("")
	public ResponseEntity<Message> PointListTop5() throws Exception{
		Message message = new Message();
    HttpStatus status = HttpStatus.NO_CONTENT;

    List<PointResponseDto> purposes = pointService.findPointTop5();
    message.setSuccess(true);
    message.setData(purposes);

    status = HttpStatus.OK;

    return new ResponseEntity<Message>(message, status);
	}

	@GetMapping("/my")
	public ResponseEntity<Message> MyPointList(@RequestParam int userId) throws Exception{
		Message message = new Message();
    HttpStatus status = HttpStatus.NO_CONTENT;

    PointMyResponseDto dto = pointService.findMyPoint(userId);
    message.setSuccess(true);
    message.setData(dto);

    status = HttpStatus.OK;

    return new ResponseEntity<Message>(message, status);
	}
	

}
