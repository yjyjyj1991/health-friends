package com.healthfriend.healthfriend.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.user.UserModifyRequest;
import com.healthfriend.healthfriend.model.DTO.user.UserPasswordChangeRequest;
import com.healthfriend.healthfriend.model.DTO.user.UserAccountRequest;
import com.healthfriend.healthfriend.model.DTO.user.UserResponse;
import com.healthfriend.healthfriend.model.DTO.user.UserSignup;
import com.healthfriend.healthfriend.model.DTO.user.UserTokenDto;
import com.healthfriend.healthfriend.model.DTO.user.UserWithdraw;
import com.healthfriend.healthfriend.model.service.JwtService;
import com.healthfriend.healthfriend.model.service.UserService;
import com.healthfriend.healthfriend.util.mail.SendMailHelper;
import com.healthfriend.healthfriend.util.password.RandomPassword;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/users")
@CrossOrigin
@Api("사용자 컨트롤러  API V1")
public class UserController {
	public static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private JwtService jwtService;

	// ----------------------------------------------------------------------------------------//
	//
	// ----------------------------------------------------------------------------------------//
	@ApiOperation(value = "로그인", notes = "Access-token과 로그인 결과 메세지를 반환한다.", response = Map.class)
	@PostMapping("/login")
	public ResponseEntity<Message> LoginList(
			@RequestBody @ApiParam(value = "로그인 시 필요한 회원정보(아이디, 비밀번호).", required = true) UserAccountRequest userAccountRequest) {
		HttpStatus status = null;
		Message message = new Message();

		try {
			UserResponse loginUser = userService.findUser(userAccountRequest);
			if (loginUser != null) {
				String token = jwtService.create("UserID", loginUser.getId(), "access-token");// key, data, subject
				logger.debug("로그인 토큰정보 : {}", token);

				Map<String, Object> map = new HashMap<String, Object>();
				map.put("accessToken", token);
				map.put("userInfo", loginUser);
				UserTokenDto userTokenDto = new UserTokenDto();
				userTokenDto.setId(loginUser.getId());
				userTokenDto.setToken(token);
				userService.modifyLogin(userTokenDto);
				message.setSuccess(true);
				message.setData(map);

				status = HttpStatus.OK;
			} else {
				message.setMessage("User Not Found");
				status = HttpStatus.OK;
			}
		} catch (Exception e) {
			logger.error("로그인 실패 : {}", e);
			message.setMessage(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Message>(message, status);
	}

	// ----------------------------------------------------------------------------------------//
	//
	// ----------------------------------------------------------------------------------------//
	@ApiOperation(value = "회원인증", notes = "회원 정보를 담은 Token을 반환한다.", response = Map.class)
	@GetMapping("/{token}")
	public ResponseEntity<Message> TokenList(
			@PathVariable("token") @ApiParam(value = "인증할 회원의 token 정보.", required = true) String token,
			HttpServletRequest request) {

		Message message = new Message();

		HttpStatus status = HttpStatus.ACCEPTED;
		if (jwtService.isUsable(token) == true) {
			logger.info("사용 가능한 토큰!!!");
			try {
				message.setSuccess(true);
				status = HttpStatus.OK;
			} catch (Exception e) {
				logger.error("정보조회 실패 : {}", e);
				message.setMessage(e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			logger.error("사용 불가능 토큰!!!");
			message.setMessage("사용 불가 토큰");
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Message>(message, status);
	}

	// ----------------------------------------------------------------------------------------//
	//
	// ----------------------------------------------------------------------------------------//

	@ApiOperation(value = "logout", notes = "logout", response = Map.class)
	@GetMapping("/logout/{token}")
	public ResponseEntity<Message> TokenRemove(@PathVariable("token") String token) {
		// 1. Access Token 검증
		Message message = new Message();
		HttpStatus status = HttpStatus.ACCEPTED;
		if (!jwtService.isUsable(token)) {
			message.setMessage("토큰 값이 잘 못 되었습니다.");
			status = HttpStatus.NOT_ACCEPTABLE;
			return new ResponseEntity<Message>(message, status);
		}
		UserTokenDto dto = new UserTokenDto();
		dto.setId(jwtService.getUserId(token));
		token = null;
		dto.setToken(token);
		try {
			userService.modifyLogin(dto);
		} catch (Exception e) {
			message.setMessage("로그아웃 실패");
			status = HttpStatus.NOT_ACCEPTABLE;
			return new ResponseEntity<Message>(message, status);
		}
		message.setMessage("로그아웃 완료");
		return new ResponseEntity<Message>(message, status);
	}

	// ----------------------------------------------------------------------------------------//
	//
	// ----------------------------------------------------------------------------------------//
	@PostMapping("")
	@ApiOperation(value = "회원등록", notes = "회원 정보를 등록한다.")
	public ResponseEntity<Message> UserSave(@RequestBody UserSignup userDto) throws Exception {
		Message message = new Message();
		HttpStatus status = HttpStatus.NO_CONTENT;

		if (userService.saveUser(userDto)) {
			message.setSuccess(true);
			message.setMessage("회원가입 완료");

			status = HttpStatus.OK;
		}

		return new ResponseEntity<Message>(message, status);
	}

	// ----------------------------------------------------------------------------------------//
	//
	// ----------------------------------------------------------------------------------------//
	@ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정한다.")
	@PutMapping("")
	public ResponseEntity<Message> UserModify(
			@RequestBody @ApiParam(value = "회원 정보 수정시 필요한 회원 정보", required = true) UserModifyRequest userModifyRequest)
			throws Exception {

		Message message = new Message();
		HttpStatus status = HttpStatus.NO_CONTENT;
		if (userService.modifyUser(userModifyRequest)) {
			message.setSuccess(true);
			message.setMessage("회원 정보 수정 완료");

			status = HttpStatus.OK;
		}

		return new ResponseEntity<Message>(message, status);
	}

	// ----------------------------------------------------------------------------------------//
	//
	// ----------------------------------------------------------------------------------------//
	@ApiOperation(value = "회원 탈퇴", notes = "DB상 회원 정보를 수정한다. (isWithdraw = 1, withraw_reason = reason")
	@DeleteMapping("")
	public ResponseEntity<Message> UserDelete(
			@RequestHeader(value = "Token") String token,
			@RequestBody UserWithdraw userWithdraw) throws Exception {
		Message message = new Message();
		System.out.println(token);
		HttpStatus status = HttpStatus.NO_CONTENT;

		if (userService.deleteUser(userWithdraw)) {
			message.setSuccess(true);
			message.setMessage("회원 탈퇴 처리 완료");

			status = HttpStatus.OK;
		}

		return new ResponseEntity<Message>(message, status);
	}

	// ----------------------------------------------------------------------------------------//
	//
	// ----------------------------------------------------------------------------------------//
	@ApiOperation(value = "이메일 인증", notes = "해당 이메일로 랜덤 인증번호를 전송. 성공 : 랜덤 값, 실패 : null")
	@GetMapping("/verify")
	public ResponseEntity<Message> verifyEmail(@RequestParam(value = "email") String email) {

		Message message = new Message();

		RandomPassword rp = new RandomPassword();
		String randomValue = rp.getRandomPassword(5);

		boolean isSuccess = SendMailHelper.getInstance().SendMail(email, randomValue);
		HttpStatus status = HttpStatus.NO_CONTENT;

		if (isSuccess) {
			message.setSuccess(isSuccess);
			message.setData(randomValue);
			status = HttpStatus.OK;
		}

		return new ResponseEntity<Message>(message, status);
	}

	// ----------------------------------------------------------------------------------------//
	//
	// ----------------------------------------------------------------------------------------//
	@ApiOperation(value = "패스워드 변경")
	@PutMapping(value = "/update-password")
	public ResponseEntity<Message> putMethodName(@RequestBody UserPasswordChangeRequest passwordChangeRequest)
			throws Exception {

		Message message = new Message();
		HttpStatus status = HttpStatus.NO_CONTENT;

		UserResponse user = userService.findUserById(passwordChangeRequest);

		if (user == null) {
			status = HttpStatus.OK;
			message.setSuccess(false);
			message.setMessage("기존 패스워드가 일치하지 않습니다.");
		} else {
			status = HttpStatus.OK;

			if (userService.updateUserPassword(passwordChangeRequest)) {
				message.setSuccess(true);
				message.setMessage("비밀번호 변경에 성공했습니다.");
			} else {
				message.setSuccess(false);
				message.setMessage("비밀번호 변경에 실패했습니다.");
			}
		}

		return new ResponseEntity<Message>(message, status);
	}

	// ----------------------------------------------------------------------------------------//
	//
	// ----------------------------------------------------------------------------------------//
	@ApiOperation(value = "임시 비밀번호 적용", notes = "해당 이메일로 임시 비밀번호를 전송")
	@PutMapping(value = "reset-password/{email}")
	public ResponseEntity<Message> resetPassword(@PathVariable String email) throws Exception {

		Message message = new Message();
		boolean isSuccess = false;
		HttpStatus status = HttpStatus.NO_CONTENT;

		RandomPassword rp = new RandomPassword();
		String randomValue = rp.getRandomPassword(10);

		UserResponse user = userService.findUserInfo(email);
		if (user == null) {
			status = HttpStatus.OK;
			message.setSuccess(false);
			message.setMessage("존재하지 않는 사용자입니다.");
		} else {
			status = HttpStatus.OK;
			UserAccountRequest userAccount = new UserAccountRequest();
			userAccount.setEmail(email);
			userAccount.setPassword(randomValue);

			if (userService.updateUserRandomPassword(userAccount)) {
				if (SendMailHelper.getInstance().SendMail(email, randomValue)) {
					isSuccess = true;
				} else {
					message.setSuccess(false);
					message.setMessage("메일 전송 실패.");
				}
			}

			if (isSuccess) {
				message.setSuccess(true);
				message.setMessage("메일 전송 완료.");
			}
		}

		return new ResponseEntity<Message>(message, status);
	}

	// ----------------------------------------------------------------------------------------//
	//
	// ----------------------------------------------------------------------------------------//
	@ApiOperation(value = "이메일 중복 확인", notes = "이메일 중복 확인, 사용가능 : true, 불가능 : false - HTTP 409 conflict")
	@GetMapping("/exists/email")
	public ResponseEntity<Message> checkEmail(@RequestParam(value = "email") String email) throws Exception {
		Message message = new Message();
		HttpStatus status = HttpStatus.NO_CONTENT;

		try {
			boolean isExists = userService.isExistsEmail(email);

			if (isExists) {
				status = HttpStatus.CONFLICT;
				message.setMessage("존재하는 이메일입니다.");
			} else {
				status = HttpStatus.OK;
				message.setMessage("사용 가능한 이메일입니다.");
			}
			message.setSuccess(true);
		} catch (Exception ex) {
			message.setMessage(ex.getMessage());
		}

		return new ResponseEntity<Message>(message, status);
	}

	// ----------------------------------------------------------------------------------------//
	//
	// ----------------------------------------------------------------------------------------//
	@ApiOperation(value = "닉네임 중복 확인", notes = "닉네임 중복 확인, 사용가능 : true, 불가능 : false - HTTP 409 conflict")
	@GetMapping("/exists/nickname")
	public ResponseEntity<Message> checkNickname(@RequestParam(value = "nickname") String nickname) throws Exception {

		Message message = new Message();
		HttpStatus status = HttpStatus.NO_CONTENT;

		try {
			boolean isExists = userService.isExistsNickname(nickname);

			if (isExists) {
				status = HttpStatus.CONFLICT;
				message.setMessage("존재하는 닉네임입니다.");
			} else {
				status = HttpStatus.OK;
				message.setMessage("사용 가능한 닉네임입니다.");
			}
			message.setSuccess(true);
		} catch (Exception ex) {
			message.setMessage(ex.getMessage());
		}

		return new ResponseEntity<Message>(message, status);
	}
}
