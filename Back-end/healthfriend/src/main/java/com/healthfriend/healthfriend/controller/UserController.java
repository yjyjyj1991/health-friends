package com.healthfriend.healthfriend.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.healthfriend.healthfriend.model.UserDto;
import com.healthfriend.healthfriend.model.service.JwtServiceImpl;
import com.healthfriend.healthfriend.model.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.jsonwebtoken.Jwts;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/user")
@Api("사용자 컨트롤러  API V1")
public class UserController {
	public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
	private UserService userService;

	@Autowired
	private JwtServiceImpl jwtService;


	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";


	@ApiOperation(value = "로그인", notes = "Access-token과 로그인 결과 메세지를 반환한다.", response = Map.class)
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> LoginList(
			@RequestBody @ApiParam(value = "로그인 시 필요한 회원정보(아이디, 비밀번호).", required = true) UserDto userDto) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			UserDto loginUser = userService.findUser(userDto);
			if (loginUser != null) {
				String token = jwtService.create("UserID", loginUser.getId(), "access-token");// key, data, subject
				logger.debug("로그인 토큰정보 : {}", token);
				resultMap.put("access-token", token);
				resultMap.put("message", SUCCESS);
			
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("name", loginUser.getName());
				jsonObj.put("email", loginUser.getEmail());
				jsonObj.put("nickname", loginUser.getNickname());
				jsonObj.put("purpose_id", loginUser.getPurpose_id());
				jsonObj.put("active_point", loginUser.getActive_point());
				jsonObj.put("weight", loginUser.getWeight());

				resultMap.put("UserInfo",jsonObj.toString());
				status = HttpStatus.ACCEPTED;
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;
			}
		} catch (Exception e) {
			logger.error("로그인 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	


	@ApiOperation(value = "회원인증", notes = "회원 정보를 담은 Token을 반환한다.", response = Map.class)
	@GetMapping("/info/{token}")
	public ResponseEntity<Map<String, Object>> TokenList(
			@PathVariable("token") @ApiParam(value = "인증할 회원의 token 정보.", required = true) String token,
			HttpServletRequest request) {
//		logger.debug("userid : {} ", userid);
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		if (jwtService.isUsable(token) == true) {
			logger.info("사용 가능한 토큰!!!");
			try {
//				로그인 사용자 정보.
				//UserDto userDto = userService.findUserInfo(""); //여기를 바꿔야 한다.
				//resultMap.put("UserInfo", userDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.error("정보조회 실패 : {}", e);
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			logger.error("사용 불가능 토큰!!!");
			resultMap.put("message", FAIL);
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}



	@PostMapping("/save")
    @ApiOperation(value = "회원등록", notes = "회원 정보를 등록한다.")
	public ResponseEntity<String> UserSave(@RequestBody UserDto userDto) throws Exception {
		if (userService.saveUser(userDto)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정한다.")
	@PutMapping("/modify")
	public ResponseEntity<String> UserModify(
			@RequestBody 
			@ApiParam(value = "회원 정보 수정시 필요한 회원 정보", required = true)
			 UserDto userDto) throws Exception {
		if (userService.modifyUser(userDto)) { //존재하면 수정
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<String> UserDelete(@RequestBody UserDto userDto) throws Exception{
		if(userService.modifyRemoveUser(userDto)){
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

}
