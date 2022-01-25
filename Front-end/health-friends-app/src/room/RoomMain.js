/*eslint-disable*/
import React, { useState } from 'react';
import {Button, ButtonGroup, Container} from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Rank from './Rank';
import RoomListCard from './RoomListCard';
import RoomCreate from './RoomCreate';
import Category from './Category';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const RoomMain = () => {

    let [open, setOpen] = useState(false);

    return (
       <>
            <Header/>
            <Container>
            <Grid container>
                <Grid item xs='8' className='myProfile'>
                    <h3>나의 프로필</h3>
                    <h4>김싸피</h4>
                </Grid>

                <Grid item xs='4' className='rankedList'>
                    <h3> TOP5 </h3>
                    <Rank/>
                </Grid>
            </Grid>
            </Container>
            

            <div className = 'roomCreate' >
                <Button variant='contained' color='primary' onClick={ ()=>{ setOpen(true) }} >방 생성하기</Button> 
                <RoomCreate open={open}/> 
            </div> 

            <Container>
                <Category/>
            </Container>

            <Container>
                <RoomListCard/>
            </Container>
        
            <Footer/>
           
        </>
       
    );
};


export default RoomMain;