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
  let [open, setOpen] = useState(false);
  let [roomId, setRoomId] = useState(null);

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
          </div>


          <div className='roomCreate' >
            <Button variant='outlined' color='primary' size='large' style={{ fontSize: '15px' }} onClick={() => { setOpen(true) }} >방 생성하기</Button>
            <RoomCreate open={open} setOpen={setOpen} setRoomId={setRoomId} roomId={roomId} />
          </div>

          <Container>
            <RoomListCard setRoomId={setRoomId} />
          </Container>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Container>
          <RoomSession roomId={roomId} setRoomId={setRoomId} />
        </Container>
      </>
    );
  }
};


export default RoomMain;