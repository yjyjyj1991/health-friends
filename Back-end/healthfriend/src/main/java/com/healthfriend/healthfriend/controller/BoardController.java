package com.healthfriend.healthfriend.controller;

import java.util.List;

import com.healthfriend.healthfriend.message.Message;
import com.healthfriend.healthfriend.model.DTO.BoardDto;
import com.healthfriend.healthfriend.model.DTO.BoardParameterDto;
import com.healthfriend.healthfriend.model.service.BoardService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/boards")
@CrossOrigin
@Api("게시판 컨트롤러  API V1")
public class BoardController {

	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

	@Autowired
	private BoardService boardService;

	@ApiOperation(value = "공지사항 전체 글목록", notes = "모든 공지글의 정보를 반환한다.", response = List.class)
	@GetMapping()
	public ResponseEntity<Message> boardList(BoardParameterDto boardParameterDto) throws Exception {
		logger.info("boardList - 호출");
		HttpStatus status = HttpStatus.OK;
		Message message = new Message();
		message.setData(boardService.findBoard(boardParameterDto));
		message.setSuccess(true);
		return new ResponseEntity<Message>(message, status);
	}

	@ApiOperation(value = "게시판 글 상세 보기", notes = "해당 글번호에 해당하는 게시글의 정보를 반환한다.", response = BoardDto.class)
	@GetMapping("/{id}")
	public ResponseEntity<Message> boardDetail(
			@PathVariable("id") @ApiParam(value = "얻어올 글의 글번호 id값을 주소창에 Get으로 얻어옴", required = true) int id)
			throws Exception {
		logger.info("boardDetail - 호출 : " + id);
		HttpStatus status = HttpStatus.OK;
		Message message = new Message();
		if (boardService.findBoardDetail(id).getIsPublic() == 1) { // 비밀글이면 막는다.
			message.setSuccess(true);
			status = HttpStatus.NOT_ACCEPTABLE;
			return new ResponseEntity<Message>(message, status);
		}
		message.setData(boardService.findBoardDetail(id));
		message.setSuccess(true);
		return new ResponseEntity<Message>(message, status);
	}

	// 비밀번호가 걸린 글
	@ApiOperation(value = "게시판 비밀글 상세 보기", notes = "해당 글번호에 해당하는 패스워드를 적절히 입력하면 방 내용을 출력한다.", response = BoardDto.class)
	@GetMapping("/password")
	public ResponseEntity<Message> boardDetailPassword(
			@ModelAttribute @ApiParam(value = "얻어올 글의 글번호 id값을 주소창에 Get으로 얻어옴", required = true) BoardDto boardDto)
			throws Exception {
		logger.info("boardDetailPassword - 호출 : " + boardDto);
		HttpStatus status = HttpStatus.OK;
		Message message = new Message();
		message.setData(boardService.findBoardDetailPassword(boardDto));
		message.setSuccess(true);
		return new ResponseEntity<Message>(message, status);
	}

	@ApiOperation(value = "공지사항 글작성", notes = "새로운 공지글 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PostMapping
	public ResponseEntity<Message> boardAdd(
			@RequestBody @ApiParam(value = "password , title , typeId, userId", required = true) BoardDto boardDto)
			throws Exception {
		logger.info("boardAdd - 호출");
		Message message = new Message();
		HttpStatus status = null;
		if (boardService.addBoard(boardDto)) {
			status = HttpStatus.OK;
			message.setSuccess(true);
			return new ResponseEntity<Message>(message, status);
		}
		message.setSuccess(false);
		status = HttpStatus.NO_CONTENT;
		return new ResponseEntity<Message>(message, status);
	}

	@ApiOperation(value = "공지사항 글 삭제", notes = "공지글을 삭제하고 성공 여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping
	public ResponseEntity<Message> boardRemove(@RequestBody @ApiParam(value = "Id 값", required = true) BoardDto boardDto)
			throws Exception {
		logger.info("boardRemove - 호출");
		Message message = new Message();
		HttpStatus status = null;
		if (boardService.removeBoard(boardDto)) {
			status = HttpStatus.OK;
			message.setSuccess(true);
			return new ResponseEntity<Message>(message, status);
		}
		status = HttpStatus.NO_CONTENT;
		message.setSuccess(false);
		return new ResponseEntity<Message>(message, status);
	}

	@ApiOperation(value = "공지사항 글 수정", notes = "공지글을 스장하고 성공 여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PutMapping
	public ResponseEntity<Message> boardModify(
			@RequestBody @ApiParam(value = "Id 값 필수, title 값과 content 값 변경이 있으면 변경", required = true) BoardDto boardDto)
			throws Exception {
		logger.info("boardModify - 호출");
		Message message = new Message();
		HttpStatus status = null;
		if (boardService.modifyBoard(boardDto)) {
			status = HttpStatus.OK;
			message.setSuccess(true);

			return new ResponseEntity<Message>(message, status);
		}
		status = HttpStatus.NO_CONTENT;
		message.setSuccess(false);
		return new ResponseEntity<Message>(message, status);
	}

}
