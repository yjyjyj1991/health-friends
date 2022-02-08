/*eslint-disable*/
import React, { useState, useCallback } from "react";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import axios from 'axios';
import { post } from 'axios';

const RoomCreate = (props) => {
  let [roomTitle, setRoomTitle] = useState('');
  let [roomType, setRoomType] = useState('');
  let [roomContent, setRoomContent] = useState('');
  let [isPublic, setIsPublic] = useState(true);
  let [password, setPassword] = useState('');

  const handlerFormSubmit = (e) => {
    e.preventDefault();
    addList()
        .then((response)=>{
          console.log(response.data);
        })
        .catch((error)=>{
          console.log(error)
        });

    if(roomTitle && roomType && roomContent ) {
      console.log(roomTitle, roomType, roomContent)
    }
  }

  const addList = () => {
    const url = 'https://i6d204.p.ssafy.io/api/rooms';
    const formData = new FormData();
    formData.append('roomType', roomType);
    formData.append('title', roomTitle);
    formData.append('content', roomContent);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    return post(url, formData, config);

  }

  return (
    <>
      <Dialog open={props.open} fullWidth>
        <DialogActions> 
          <Button variant="text" size='small' onClick={()=>{props.setOpen(false)}}> x </Button>
        </DialogActions>
        <DialogTitle >방 생성하기</DialogTitle>
        <DialogContent>
          <DialogContentText >
            {/* <form onSubmit={add}> */}
            <form onSubmit={handlerFormSubmit}>
              <select name="roomType" onChange={(e) => setRoomType(e.target.value) }>
                <option value="">--운동 종류 선택--</option>
                <option value="헬스">헬스</option>
                <option value="요가">요가</option>
                <option value="필라테스">필라테스</option>
                <option value="기타">기타</option>
              </select>
              {/* <select name='isPublic'>
                <option value=''>--채널 비공개--</option>
                <option value='private' onChange={()=>setIsPublic(false)}>비공개</option>
                <option value='public'>공개</option>
              </select> */}
              <TextField variant='standard' fullWidth required label='방 이름' onChange={(e) => setRoomTitle(e.target.value)}/> 
              <TextField variant='standard' fullWidth required multiline maxRows={4} label='방 상세 설명' onChange={(e) => setRoomContent(e.target.value)}/>
              {/* {
                isPublic===false
                ? <TextField type='password' variant='standard' fullWidth required label='비밀번호 설정' onChange={(e) => setPassword(e.target.value)}/>
                : null
              } */}
             
              <DialogActions> 
                <Button variant="outlined" type="submit"> 만들기 </Button>
              </DialogActions>
            </form>

          </DialogContentText>
        </DialogContent>
        
      </Dialog>
    </>
  );
};

export default RoomCreate;
