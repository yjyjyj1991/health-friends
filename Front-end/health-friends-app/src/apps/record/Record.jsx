import ResponsiveDatePickers from "components/common/CalenderTextField"
import {Button, Grid, Box} from '@mui/material'
import { useState,  } from "react"
import axios from "axios"
import BasicTable2 from "./BasicTable"
import AppBar from '../../components/appbar/AppBar';
import Footer from '../../components/Footer/Footer';
import Rank from '../../components/room/Rank';

export default function Record(){
  const userInfo=JSON.parse(localStorage.getItem('user')).userInfo
  const [open,setOpen]=useState(new Date())
  const [close,setClose]=useState(new Date())
  const [records,setRecords]=useState([])
  const BASE_URL='https://i6d204.p.ssafy.io/api/'
  const [dialog,setDialog]=useState(false)

  function getRecord(){
    const params={
      openTime:`${open.getFullYear()}-${open.getMonth()+1}-${open.getDate()}`,
      closeTime:`${close.getFullYear()}-${close.getMonth()+1}-${close.getDate()}`,
      userId:userInfo.id,
    }
    axios.get(BASE_URL+'exercise',{params:params})
    .then(res=>{
      setRecords(res.data.data)
    })
    .catch(err=>console.log(err))
  }
  return (
    <div style={{display: 'flex', flexDirection:'column', minHeight:'100%', }}>
      <AppBar dialog={dialog} setDialog={setDialog} />
      <div className="container" style={{flex:'1'}}>
        <Rank/>
        <Grid container spacing={2} margintTop={3}>
          <Grid item  xs={12} lg={3} marginTop={2}  align='center' >
            <ResponsiveDatePickers value={open} setValue={setOpen} which={'시작날짜'}/>
            <br />
            <ResponsiveDatePickers value={close} setValue={setClose} which={'종료날짜'}/>
            <br />
            <Button size="large" style ={{backgroundColor:'#ADC2A9',color:'white', '&:hover':{backgroundColor:'#D3E4CD', fontSize:'2rem'}}} onClick={getRecord}>검색</Button>
          </Grid>

          <Grid item xs={12} lg={9} marginTop={3}>
            <BasicTable2 records={records} />
          </Grid>
        </Grid>
      </div>
      <Footer/>
    </div>
  )
}