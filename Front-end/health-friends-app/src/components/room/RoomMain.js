/*eslint-disable*/
import React, { useState } from 'react';
import { Button, Container } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Rank from './Rank';
import RoomListCard from './RoomListCard';
import RoomCreate from './RoomCreate';

import AppBar from '../appbar/AppBar';
import Footer from '../Footer/Footer';
import RoomSession from './RoomSession';

const RoomMain = () => {
  const [dialog, setDialog] = useState(null)
  let roomIdState = JSON.parse(window.localStorage.getItem('roomId'));
  let [open, setOpen] = useState(false);
  let [roomId, setRoomId] = useState(roomIdState === null ? null : roomIdState);

  window.document.onkeydown = ((e) => {
    if (roomId !== null && e.key === 'F5') {
      return false;
    }
  });
  if (roomId == null) {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
          <AppBar dialog={dialog} setDialog={setDialog} />
          <div className='top' style={{ flex: '1' }}>
            <Container>
              <Grid container>
                <Grid item xs='8' className='myProfile'>
                  <h3>나의 프로필</h3>
                  <h4>김싸피</h4>
                </Grid>

                <Grid item xs='4' className='rankedList'>
                  <h3> TOP5 </h3>
                  <Rank />
                </Grid>
              </Grid>
            </Container>


          <div className='roomCreate' >
            <Button variant='outlined' color='primary' size='large' style={{ fontSize: '15px' }} onClick={() => { setOpen(true) }} >방 생성하기</Button>
            <RoomCreate open={open} setOpen={setOpen} setRoomId={setRoomId} roomId={roomId} />
          </div>

          <Container>
            <RoomListCard setRoomId={setRoomId} />
          </Container>
          </div>
          <Footer/>
        </div>
      </>
    );
  } else {
    return (

      // <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

        // <div style={{height:'100%'}}>
        <RoomSession roomId={roomId} setRoomId={setRoomId} />
        // </div>
      // </div>
      

    );
  }
};


export default RoomMain;