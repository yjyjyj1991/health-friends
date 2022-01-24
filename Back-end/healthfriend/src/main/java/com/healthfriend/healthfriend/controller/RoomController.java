package com.healthfriend.healthfriend.controller;

import java.util.List;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.Room.RoomDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomModifyRequestDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomResponseDto;
import com.healthfriend.healthfriend.model.service.RoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
@Api("룸 컨트롤러  API V1")
public class RoomController {

  @Autowired
  RoomService roomService;

  @PostMapping("")
  public ResponseEntity<Message> roomAdd(@RequestBody RoomDto roomDto) throws Exception {
    boolean isSuccess = roomService.addRoom(roomDto);
    Message message = new Message();
    message.setSuccess(isSuccess);
    return new ResponseEntity<Message>(message, isSuccess ? HttpStatus.OK : HttpStatus.NO_CONTENT);
  }

  @GetMapping("")
  public ResponseEntity<Message> roomList() throws Exception {
    Message message = new Message();
    HttpStatus status = HttpStatus.NO_CONTENT;

    try {
      List<RoomResponseDto> room = roomService.findRoom();
      message.setSuccess(true);
      message.setData(room);

      status = HttpStatus.OK;
    } catch (Exception ex) {
      message.setMessage(ex.getMessage());
    }

    return new ResponseEntity<Message>(message, status);
  }

  @GetMapping("/title")
  public ResponseEntity<Message> roomList(@RequestParam(value = "title") String title) throws Exception {
    Message message = new Message();
    HttpStatus status = HttpStatus.NO_CONTENT;

    try {
      List<RoomResponseDto> room = roomService.findRoom(title);
      System.out.println(room);
      message.setSuccess(true);
      message.setData(room);

      status = HttpStatus.OK;
    } catch (Exception ex) {
      message.setMessage(ex.getMessage());
    }

    return new ResponseEntity<Message>(message, status);
  }

  @PutMapping("")
  public ResponseEntity<Message> roomModify(@RequestBody RoomModifyRequestDto roomModifyRequestDto) throws Exception {
    Message message = new Message();
    HttpStatus status = HttpStatus.NO_CONTENT;

    if (roomService.modifyRoom(roomModifyRequestDto)) {
      message.setSuccess(true);
      status = HttpStatus.OK;
    } else {
      message.setSuccess(false);
      message.setMessage("정상적으로 수정되지 않았습니다.");
      status = HttpStatus.BAD_REQUEST;
    }

    return new ResponseEntity<Message>(message, status);
  }
}
