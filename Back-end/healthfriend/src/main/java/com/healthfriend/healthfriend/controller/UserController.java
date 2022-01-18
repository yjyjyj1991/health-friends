package com.healthfriend.healthfriend.controller;

import com.healthfriend.healthfriend.model.UserDto;
import com.healthfriend.healthfriend.model.service.UserService;
import com.healthfriend.healthfriend.util.mail.SendMailHelper;
import com.healthfriend.healthfriend.util.password.RandomPassword;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/user")
@Api("사용자 컨트롤러  API V1")
public class UserController {
	@Autowired
	private UserService userService;

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

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
			@RequestBody @ApiParam(value = "회원 정보 수정시 필요한 회원 정보", required = true) UserDto userDto) throws Exception {
		if (userService.modifyUser(userDto)) { // 존재하면 수정
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "회원 탈퇴", notes = "DB상 회원 정보를 수정한다. (isWithdraw = 1, withraw_reason = reason")
	@DeleteMapping("/delete")
	public ResponseEntity<String> UserDelete(@RequestBody UserDto userDto) throws Exception {
		if (userService.deleteUser(userDto)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "이메일 인증", notes = "해당 이메일로 랜덤 인증번호를 전송. 성공 : 랜덤 값, 실패 : null")
	@GetMapping("/email-check")
	public String emailCheck(@RequestParam(value = "email") String email) {
		System.out.println(email);
		RandomPassword rp = new RandomPassword();
		String randomValue = rp.getRandomPassword(5);
		return SendMailHelper.getInstance().SendMail(email, randomValue) ? randomValue : null;
	}
}
