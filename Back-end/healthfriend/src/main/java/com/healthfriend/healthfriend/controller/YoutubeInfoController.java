package com.healthfriend.healthfriend.controller;

import java.sql.SQLException;
import java.util.List;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.YoutubeInfo.YoutubeInfoResponseDto;
import com.healthfriend.healthfriend.model.service.YoutubeInfoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/youtube")
public class YoutubeInfoController {

  @Autowired
  private YoutubeInfoService youtubeInfoService;

  @GetMapping("")
  public ResponseEntity<Message> getYoutubeInfoListByTypeId(@RequestParam int typeId) throws Exception {
    Message message = new Message();

    List<YoutubeInfoResponseDto> youtubeInfos = youtubeInfoService.getYoutubeInfoListByTypeId(typeId);
    message.setSuccess(true);
    message.setData(youtubeInfos);
    return new ResponseEntity<Message>(message, HttpStatus.OK);
  }
}
