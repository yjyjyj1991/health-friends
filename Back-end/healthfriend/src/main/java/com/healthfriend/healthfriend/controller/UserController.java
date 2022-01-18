package com.healthfriend.healthfriend.controller;

import com.healthfriend.healthfriend.model.UserDto;
import com.healthfriend.healthfriend.model.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

	@DeleteMapping("/delete")
	public ResponseEntity<String> UserDelete(@RequestBody UserDto userDto) throws Exception {
		if (userService.deleteUser(userDto)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}
}
