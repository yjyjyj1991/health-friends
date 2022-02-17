/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import axios from 'axios';
import { post } from 'axios';
import { BASE_URL } from 'common/Properties.js';
import RTC from 'components/room/RTC/RTCHelper.js';


const RoomCreate = (props) => {
  let [roomTitle, setRoomTitle] = useState('');
  let [roomType, setRoomType] = useState(undefined);
  let [roomContent, setRoomContent] = useState('');
  let [isPublic, setIsPublic] = useState(true);
  let [password, setPassword] = useState('');
  let [typeList, setTypeList] = useState([]);

  const handlerFormSubmit = (e) => {
    console.log("handlerFormSubmit");
    e.preventDefault();

    if (roomType === undefined) {
      alert('운동 종류가 선택되지 않았습니다.');
      return;
    }
    var rtc = new RTC();

    const formData = new FormData();
    formData.append('userId', JSON.parse(localStorage.getItem('user'))['userInfo']['id']);
    formData.append('typeId', roomType);
    formData.append('title', roomTitle);
    formData.append('content', roomContent);
    formData.append('isPublic', 1);
    formData.append('password', null);
    formData.append('limitUser', 5);
    var object = {}
    formData.forEach(function (value, key) {
      object[key] = value
    })
    var data = JSON.stringify(object)
    console.log(data);

    rtc.create(data, (result) => {
      if (result && result['success']) {
        props.setRoomId(result['data']['id']);
        window.localStorage.setItem("roomId", result['data']['id']);
        console.log(result);
        props.setOpen(false);
      } else {
        alert(result);
        console.log(result);
      }
    });
  }

  useEffect(() => {
    axios.get(BASE_URL + 'room-type')
      .then((res) => {
        setTypeList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  return (
    <>
      <Dialog open={props.open} fullWidth>
        <DialogActions>
          <Button variant="text" size='small' onClick={() => { props.setOpen(false) }}> x </Button>
        </DialogActions>
        <DialogTitle >방 생성하기</DialogTitle>
        <DialogContent>
          <DialogContentText >
            <form onSubmit={handlerFormSubmit}>
              <select name="roomType" onChange={(e) => setRoomType(e.target.value)}>
                <option value={undefined} key={undefined}>{'<-- 종류 선택 -->'}</option>
                {typeList && typeList.map((item, idx) => (
                  <option value={item.id} key={item.id}>{item.type}</option>
                ))}
              </select>
              <TextField variant='standard' fullWidth required label='방 이름' onChange={(e) => setRoomTitle(e.target.value)} />
              <TextField variant='standard' fullWidth required multiline maxRows={4} label='방 상세 설명' onChange={(e) => setRoomContent(e.target.value)} />

              <DialogActions>
                <Button variant="outlined" type="submit"> 생성 </Button>
              </DialogActions>
            </form>

          </DialogContentText>
        </DialogContent>

      </Dialog>
    </>
  );
};

export default RoomCreate;
