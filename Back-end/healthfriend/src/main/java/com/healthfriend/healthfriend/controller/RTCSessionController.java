package com.healthfriend.healthfriend.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpSession;

import com.google.gson.JsonObject;
import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.Session.SessionRequestDto;

import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import springfox.documentation.spring.web.json.Json;

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
  public ResponseEntity<Message> getToken(@RequestBody SessionRequestDto sessionRequestDto)
      throws ParseException {
    System.out.println(sessionRequestDto.toString());
    System.out.println(sessionRequestDto.getSessionName());

    String sessionName = sessionRequestDto.getSessionName();
    OpenViduRole role = OpenViduRole.SUBSCRIBER;
    String serverData = "{\"serverData\": \"" + sessionRequestDto.getUserName() + "\"}";
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
}
