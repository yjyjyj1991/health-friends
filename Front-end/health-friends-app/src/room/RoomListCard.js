import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import RoomData from './RoomData';
import { ButtonGroup, Button } from '@material-ui/core';

function RoomListCard() {

  let [datas, setDatas] = useState(RoomData);
  const filterResult=(selectedType)=>{
    const result = RoomData.filter(curData => curData.type === selectedType);
    setDatas(result);
}

  return (
      <>
        <div className= 'roomType'>
            <ButtonGroup>
                <Button variant='outlined' size='large' style={{fontSize: '15px', backgroundColor: '#F6F2D4'}} onClick={()=>setDatas(RoomData)}>All</Button>
                <Button variant='outlined' size='large' style={{fontSize: '15px', backgroundColor: '#F6F2D4'}} onClick={()=>filterResult('헬스')}>헬스</Button>
                <Button variant='outlined' size='large' style={{fontSize: '15px', backgroundColor: '#F6F2D4'}} onClick={()=>filterResult('요가')}>요가</Button>
                <Button variant='outlined' size='large' style={{fontSize: '15px', backgroundColor: '#F6F2D4'}} onClick={()=>filterResult('필라테스')}>필라테스</Button>
                <Button variant='outlined' size='large' style={{fontSize: '15px', backgroundColor: '#F6F2D4'}} onClick={()=>filterResult('기타')}>기타</Button>
            </ButtonGroup> 
        </div>

     <div className='roomList'>   
      <Grid container >
        
            {
                datas.map((data, i)=>{
                    return(
                        <Grid item xs='3'>
                            <List data= {datas[i]} i={i} key={i} />
                        </Grid>
                    )
                })
            }       
        
       </Grid>
       </div>
      </>
  );
}

function List(props) {
    return(
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="200"
                    image={props.data.img}
                    alt="pic"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                        {props.data.title}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        {props.data.type}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="large" color="primary" variant='outlined' style={{fontSize: '15px'}}> 입장하기 </Button>
                    <Button size="large" color="primary" variant='outlined' style={{fontSize: '15px'}}> 상세보기 </Button>
                    <span className='like'>❤ {props.data.like}</span>
                </CardActions>
            </Card>
        </div>
    )
}

export default RoomListCard;
