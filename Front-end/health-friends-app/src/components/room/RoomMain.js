/*eslint-disable*/
import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Rank from '../../apps/record/Rank';
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
          {/* <AppBar /> */}
          <AppBar dialog={dialog} setDialog={setDialog} />
          <div className='top' style={{ flex: '1', }}>
              {/* <Rank></Rank> */}
            <div style={{ flex: '1', display: 'flex', justifyContent:'center', margin:'5rem' }}>
              <Button size='large' style={{ fontSize:'15px', backgroundColor:'#ADC2A9', color:'white', '&:hover':{backgroundColor:'#D3E4CD',}}} onClick={() => { setOpen(true) }} >방 생성하기</Button>
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