package com.healthfriend.healthfriend.controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.RTCSession.RTCSessionInfoDto;
import com.healthfriend.healthfriend.model.DTO.RTCSession.RTCSessionLeaveRequestDto;
import com.healthfriend.healthfriend.model.DTO.RTCSession.RTCSessionTokenRequestDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomDetailResponseDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomDto;
import com.healthfriend.healthfriend.model.DTO.user.UserResponse;
import com.healthfriend.healthfriend.model.service.RoomService;
import com.healthfriend.healthfriend.model.service.UserService;

import org.apache.tomcat.util.json.ParseException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;

@RestController
@RequestMapping("/rtc")
@CrossOrigin
public class RTCSessionController {

  @Autowired
  UserService userService;

  @Autowired
  RoomService roomService;

  private OpenVidu openVidu;

  private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
  private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();

  private String OPENVIDU_URL;
  private String SECRET;

  public RTCSessionController(@Value("${openvidu.secret}") String secret,
      @Value("${openvidu.url}") String openviduUrl) {
    this.SECRET = secret;
    this.OPENVIDU_URL = openviduUrl;
    this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
  }

  // ----------------------------------------------------------------------------------------//
  //
  // ----------------------------------------------------------------------------------------//
  @PostMapping("/get-token")
  public ResponseEntity<Message> getToken(@RequestBody RTCSessionInfoDto rtcSessionInfoDto)
      throws ParseException, Exception {

    System.out.println("#getToken");

    Message message = new Message();
    boolean isSuccess = false;

    RTCSessionInfoDto sessionInfo = roomService.findSessionInfo(rtcSessionInfoDto.getId());
    sessionInfo.setNickname(rtcSessionInfoDto.getNickname());

    String sessionName = sessionInfo.getSessionName();

    OpenViduRole role = this.mapSessions.get(sessionName) == null ? OpenViduRole.PUBLISHER : OpenViduRole.SUBSCRIBER;
    role = OpenViduRole.PUBLISHER;
    String serverData = "{\"serverData\": \"" + sessionInfo.getNickname() + "\"}";
    ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC)
        .data(serverData).role(role).build();

    if (sessionInfo.getCloseTime() == null) {
      if (this.mapSessions.get(sessionName) != null) {
        System.out.println("Existing session " + sessionName);
        try {
          String token = this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();
          this.mapSessionNamesTokens.get(sessionName).put(token, role);

          sessionInfo.setToken(token);
          isSuccess = true;
        } catch (OpenViduJavaClientException e1) {
          message.setMessage(e1.getMessage());
        } catch (OpenViduHttpException e2) {
          if (404 == e2.getStatus()) {
            this.mapSessions.remove(sessionName);
            this.mapSessionNamesTokens.remove(sessionName);
          }
        }
      } else {
        System.out.println("New session " + sessionName);
        try {
          Session session = this.openVidu.createSession();
          String token = session.createConnection(connectionProperties).getToken();
          this.mapSessions.put(sessionName, session);
          this.mapSessionNamesTokens.put(sessionName, new ConcurrentHashMap<>());
          this.mapSessionNamesTokens.get(sessionName).put(token, role);

          sessionInfo.setToken(token);
          isSuccess = true;

        } catch (Exception e) {
          message.setMessage(e.getMessage() + e.getStackTrace());
        }
      }
    }
    if (this.mapSessionNamesTokens.get(sessionName) == null) {
      sessionInfo = null;
      roomService.closeBySessionName(sessionName);
    }

    message.setSuccess(isSuccess);
    message.setData(sessionInfo);

    return new ResponseEntity<Message>(message, HttpStatus.OK);
  }

  // ----------------------------------------------------------------------------------------//
  //
  // ----------------------------------------------------------------------------------------//
  @Transactional
  @PostMapping("/session")
  public ResponseEntity<Message> createSession(@RequestBody RoomDto roomDto)
      throws ParseException, Exception {
    System.out.println("#createSession");

    Message message = new Message();
    String msg = "";
    boolean isSuccess = false;
    RoomDetailResponseDto responseData = null;

    Timestamp ts = new Timestamp(System.currentTimeMillis());
    String sessionName = roomDto.getUserId().toString() + ts.getTime();
    UserResponse userInfo = userService.findUserById(roomDto.getUserId());
    roomDto.setSessionName(sessionName);

    if (!roomService.addRoom(roomDto)) {
      msg = "DB 저장 실패";
    } else {
      responseData = roomService.findRoomBySessionName(sessionName);
      if (responseData == null) {
        msg = "DB 조회 실패";
      } else {
        isSuccess = true;
      }
    }

    message.setSuccess(isSuccess);
    message.setMessage(msg);
    message.setData(responseData);
    return new ResponseEntity<>(message, HttpStatus.OK);
  }

  // ----------------------------------------------------------------------------------------//
  //
  // ----------------------------------------------------------------------------------------//
  @PostMapping("/leave")
  public ResponseEntity<Message> removeUser(@RequestBody RTCSessionLeaveRequestDto rtcSessionLeaveRequestDto)
      throws Exception {
    Message message = new Message();
    String msg = null;
    boolean isSuccess = false;
    boolean isCloseable = false;

    HttpStatus status;

    System.out.println("Removing user | {sessionName, token}=" + rtcSessionLeaveRequestDto.getToken());

    String sessionName = rtcSessionLeaveRequestDto.getSessionName();
    String token = rtcSessionLeaveRequestDto.getToken();

    if (this.mapSessions.get(sessionName) != null && this.mapSessionNamesTokens.get(sessionName) != null) {
      if (this.mapSessionNamesTokens.get(sessionName).remove(token) != null) {
        if (this.mapSessionNamesTokens.get(sessionName).isEmpty()) {
          isCloseable = true;
          this.mapSessions.remove(sessionName);
        }

        isSuccess = true;
        status = HttpStatus.OK;
      } else {
        msg = "Problems in the app server: the TOKEN wasn't valid";
        isCloseable = true;
        status = HttpStatus.INTERNAL_SERVER_ERROR;
      }

    } else {
      msg = "Problems in the app server: the SESSION does not exist";
      isCloseable = true;
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    message.setMessage(msg);
    message.setSuccess(isSuccess);

    if (isCloseable) {
      roomService.closeBySessionName(sessionName);
    }

    return new ResponseEntity<>(message, status);
  }
}
