package com.healthfriend.healthfriend.controller;

import java.util.List;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.RoomType.RoomTypeResponseDto;
import com.healthfriend.healthfriend.model.service.RoomTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/room-type")
@CrossOrigin
@Api("방의 운동 종목 컨트롤러  API V1")
public class RoomTypeController {

  @Autowired
  private RoomTypeService roomTypeService;

  @GetMapping("")
  public ResponseEntity<Message> roomTypeList() throws Exception {
    Message message = new Message();
    HttpStatus status = HttpStatus.NO_CONTENT;

    List<RoomTypeResponseDto> roomTypes = roomTypeService.findRoomType();

    message.setSuccess(true);
    message.setData(roomTypes);
    status = HttpStatus.OK;

    return new ResponseEntity<Message>(message, status);
  }

}
