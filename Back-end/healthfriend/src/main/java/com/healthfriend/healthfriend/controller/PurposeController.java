package com.healthfriend.healthfriend.controller;

import java.util.List;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.Purpose.PurposeResponseDto;
import com.healthfriend.healthfriend.model.service.PurposeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/purposes")
@CrossOrigin
@Api("운동 목적 컨트롤러  API V1")
public class PurposeController {

  @Autowired
  private PurposeService purposeService;

  @GetMapping("")
  public ResponseEntity<Message> purposeList() throws Exception {
    Message message = new Message();
    HttpStatus status = HttpStatus.NO_CONTENT;

    List<PurposeResponseDto> purposes = purposeService.findPurpose();
    message.setSuccess(true);
    message.setData(purposes);

    status = HttpStatus.OK;

    return new ResponseEntity<Message>(message, status);
  }
}
