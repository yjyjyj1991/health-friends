import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ButtonGroup, Button } from '@material-ui/core';
import { BASE_URL } from 'common/Properties';
import axios from 'axios';

const RoomListCard = (props) => {

  let [sessionListOrigin, setSessionListOrigin] = useState([]);
  let [lists, setLists] = useState([]);
  let [typeList, setTypeList] = useState([]);

  const sessionFilter = (sessionType) => {
    let sessionList = sessionListOrigin;
    if (sessionType !== true) {
      sessionList = sessionList.filter(curData => curData.typeId === sessionType);
    }

    setLists(sessionList);
  }

  useEffect(() => {
    getSessionList(setSessionListOrigin, setLists);
    getSessionTypeList(setTypeList)
  }, []);

  return (
    <>
      <div className='roomType'>
        <ButtonGroup style={{display:'flex', justifyContent:'center'}}>
          <Button variant='outlined' size='large' style={{ fontSize:'15px', backgroundColor:'white', color:'black', borderColor:'#ADC2A9', '&:hover': {backgroundColor: '#D3E4CD'},'&:focus':{backgroundColor:'#D3E4CD'} ,'&:active':{backgroundColor:'#D3E4CD'}}} onClick={() => sessionFilter(true)}>All</Button>
          {typeList && typeList.map((item, idx) => {
            return (
              <Button key={idx} variant='outlined' size='large' style={{ fontSize:'15px', backgroundColor:'white', color:'black', borderColor:'#ADC2A9','&:hover': {backgroundColor: '#D3E4CD'},'&:focus':{backgroundColor:'#D3E4CD'} ,'&:active':{backgroundColor:'#D3E4CD'}}} onClick={() => sessionFilter(item.id)}>{item.type}</Button>
              );
            })}
        </ButtonGroup>
      </div>

      <div className='roomList' style={{marginTop: '2rem'}}>
        <Grid container className="d-flex justify-content-evenly" >
          {
            lists && lists.map((list, i) => {
              return (
                <List list={list} key={i} rootProps={props} />
              )
            })
          }
        </Grid>
      </div>
    </>
  );
}

function getSessionList(setSessionListOrigin, setLists) {
  axios.get(BASE_URL + 'rooms')
    .then((Response) => {
      setSessionListOrigin(Response.data.data);
      setLists(Response.data.data);
      console.log(Response.data);
    })
    .catch((error) => {
      console.log(error);
    })
}

function getSessionTypeList(setTypeList) {
  axios.get(BASE_URL + 'room-type')
    .then((res) => {
      setTypeList(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    })
}

function List(props) {
  return (
    <div>
      <Card sx={{ width: 250, marginTop:'1rem', }} >
        <CardActionArea sx={{ '&:hover':{backgroundColor:'#ADC2A9'},display: 'flex', flexDirection: 'column', }}>
            <CardContent sx={{paddingLeft:0}}>
              <Typography gutterBottom variant="h3" >
                {props.list.title}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                종류 : {props.list.roomType}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                방장 : {props.list.host}
              </Typography>
            </CardContent>
            <CardContent sx={{display:'flex', justifyContent:'center', }}>
              <Button size="large" style={{ fontSize: '15px', backgroundColor:'#D3E4CD',  color:'black','&:hover':{backgroundColor:'#ADC2A9'}, borderColor:'#D3E4CD' }} onClick={() => {
                props.rootProps.setRoomId(props.list.id);
                window.localStorage.setItem("roomId", props.list.id);
              }}> 입장하기 </Button>
              {/* <Button size="large" style={{ fontSize: '15px',  color:'black','&:hover':{backgroundColor:'#D3E4CD'}, borderColor:'#D3E4CD' }}> 상세보기 </Button> */}
            </CardContent>
          </CardActionArea>
      </Card>
    </div>
  )
}

export default RoomListCard;
