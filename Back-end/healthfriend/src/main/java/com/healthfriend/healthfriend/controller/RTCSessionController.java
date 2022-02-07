package com.healthfriend.healthfriend.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.RTCSession.RTCSessionLeaveRequestDto;
import com.healthfriend.healthfriend.model.DTO.RTCSession.RTCSessionTokenRequestDto;

import org.apache.tomcat.util.json.ParseException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/rtc")
@CrossOrigin
public class RTCSessionController {
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
  public ResponseEntity<Message> getToken(@RequestBody RTCSessionTokenRequestDto sessionRequestDto)
      throws ParseException {
    System.out.println(sessionRequestDto.toString());
    System.out.println(sessionRequestDto.getSessionName());

    String sessionName = sessionRequestDto.getSessionName();
    OpenViduRole role = OpenViduRole.SUBSCRIBER;
    String serverData = "{\"serverData\": \"" + sessionRequestDto.getUserNickName() + "\"}";
    ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC)
        .data(serverData).role(role).build();

    Message message = new Message();
    boolean isSuccess = false;
    JSONObject data = new JSONObject();

    if (this.mapSessions.get(sessionName) != null) {
      System.out.println("Existing session " + sessionName);
      try {
        String token = this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();
        this.mapSessionNamesTokens.get(sessionName).put(token, role);

        data.put("token", token);
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

        data.put("token", token);
        isSuccess = true;

      } catch (Exception e) {
        message.setMessage(e.getMessage() + e.getStackTrace());
      }
    }
    message.setSuccess(isSuccess);
    message.setData(data.toMap());
    System.out.println(data);
    return new ResponseEntity<>(message, HttpStatus.OK);
  }

  // ----------------------------------------------------------------------------------------//
  //
  // ----------------------------------------------------------------------------------------//
  @PostMapping("/leave")
  public ResponseEntity<Message> removeUser(@RequestBody RTCSessionLeaveRequestDto rtcSessionLeaveRequestDto)
      throws Exception {

    // try {
    // checkUserLogged(httpSession);
    // } catch (Exception e) {
    // return getErrorResponse(e);
    // }

    Message message = new Message();
    String msg = null;
    boolean isSuccess = false;

    HttpStatus status;

    System.out.println("Removing user | {sessionName, token}=" + rtcSessionLeaveRequestDto.getToken());

    String sessionName = rtcSessionLeaveRequestDto.getSessionName();
    String token = rtcSessionLeaveRequestDto.getToken();

    if (this.mapSessions.get(sessionName) != null && this.mapSessionNamesTokens.get(sessionName) != null) {
      if (this.mapSessionNamesTokens.get(sessionName).remove(token) != null) {
        if (this.mapSessionNamesTokens.get(sessionName).isEmpty()) {
          this.mapSessions.remove(sessionName);
        }

        isSuccess = true;
        status = HttpStatus.OK;
      } else {
        msg = "Problems in the app server: the TOKEN wasn't valid";
        status = HttpStatus.INTERNAL_SERVER_ERROR;
      }

    } else {
      msg = "Problems in the app server: the SESSION does not exist";
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    message.setMessage(msg);
    message.setSuccess(isSuccess);

    return new ResponseEntity<>(message, status);
  }
}
