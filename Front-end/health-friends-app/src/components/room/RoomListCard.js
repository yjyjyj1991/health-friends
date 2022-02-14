import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ButtonGroup, Button } from '@material-ui/core';
import axios from 'axios';

const RoomListCard = (props) => {

  let [lists, setLists] = useState([]);

  const filterResult = (selectedType) => {
    const result = lists.data.filter(curData => curData.roomType === selectedType);
    setLists(result);
  }



  useEffect(() => {
    axios.get('https://i6d204.p.ssafy.io/api/rooms')
      .then((Response) => {
        setLists(Response.data);
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <>
      <div className='roomType'>
        <ButtonGroup>
          <Button variant='outlined' size='large' style={{ fontSize: '15px', backgroundColor: '#F6F2D4' }} onClick={() => setLists(lists)}>All</Button>
          <Button variant='outlined' size='large' style={{ fontSize: '15px', backgroundColor: '#F6F2D4' }} onClick={() => filterResult('헬스')}>헬스</Button>
          <Button variant='outlined' size='large' style={{ fontSize: '15px', backgroundColor: '#F6F2D4' }} onClick={() => filterResult('요가')}>요가</Button>
          <Button variant='outlined' size='large' style={{ fontSize: '15px', backgroundColor: '#F6F2D4' }} onClick={() => filterResult('필라테스')}>필라테스</Button>
          <Button variant='outlined' size='large' style={{ fontSize: '15px', backgroundColor: '#F6F2D4' }} onClick={() => filterResult('기타')}>기타</Button>
        </ButtonGroup>
      </div>

      <div className='roomList'>
        <Grid container >
          {
            lists.data && lists.data.map((list, i) => {
              //console.log(list, i);
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

function List(props) {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          {/* <CardMedia
                    component="img"
                    height="200"
                    image={props.list.img}
                    alt="pic"
                    /> */}
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
