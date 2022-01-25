import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import RoomData from './RoomData';

function RoomListCard() {

  let [datas, setDatass] = useState(RoomData);

  return (
      <>
      <Grid container>
        
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
                    <Typography gutterBottom variant="h5" component="div">
                        {props.data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.data.type}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button className='enterBtn' size="small" color="primary" variant='outlined'> 입장하기 </Button>
                    <Button className='detailBtn' size="small" color="primary" variant='outlined'> 상세보기 </Button>
                    <span className='like'>❤ {props.data.like}</span>
                </CardActions>
            </Card>
        </div>
    )
}

export default RoomListCard;
