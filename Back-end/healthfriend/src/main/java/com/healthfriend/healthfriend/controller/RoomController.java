package com.healthfriend.healthfriend.controller;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.RoomDto;
import com.healthfriend.healthfriend.model.service.RoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/room")
public class RoomController {

  @Autowired
  RoomService roomService;

  @PostMapping("/")
  public ResponseEntity<Message> roomAdd(@RequestBody RoomDto roomDto) throws Exception {
    boolean isSuccess = roomService.addRoom(roomDto);
    Message message = new Message();
    message.setSuccess(isSuccess);
    return new ResponseEntity<Message>(message, isSuccess ? HttpStatus.OK : HttpStatus.NO_CONTENT);
  }
}
