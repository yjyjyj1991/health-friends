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
        <ButtonGroup>
          <Button variant='outlined' size='large' style={{ fontSize: '15px', backgroundColor: '#F6F2D4' }} onClick={() => sessionFilter(true)}>All</Button>
          {typeList && typeList.map((item, idx) => {
            return (
              <Button variant='outlined' size='large' style={{ fontSize: '15px', backgroundColor: '#F6F2D4' }} onClick={() => sessionFilter(item.id)}>{item.type}</Button>
            );
          })}
        </ButtonGroup>
      </div>

      <div className='roomList'>
        <Grid container >
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
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {props.list.title}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {props.list.roomType}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {props.list.host}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="large" color="primary" variant='outlined' style={{ fontSize: '15px' }} onClick={() => {
            props.rootProps.setRoomId(props.list.id);
            window.localStorage.setItem("roomId", props.list.id);
          }}> 입장하기 </Button>
          <Button size="large" color="primary" variant='outlined' style={{ fontSize: '15px' }}> 상세보기 </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default RoomListCard;
