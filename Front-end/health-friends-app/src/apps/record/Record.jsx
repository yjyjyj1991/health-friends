import ResponsiveDatePickers from "components/common/CalenderTextField"
import {Button, Grid, Box, Typography} from '@mui/material'
import { useState, useEffect } from "react"
import axios from "axios"
import BasicTable2 from "./BasicTable"
import AppBar from '../../components/appbar/AppBar';
import Footer from '../../components/Footer/Footer';
import Rank from './Rank';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from 'react-router-dom'

export default function Record(){
  const userInfo=JSON.parse(localStorage.getItem('user')).userInfo
  const BASE_URL='https://i6d204.p.ssafy.io/api/'
  const [open,setOpen]=useState(new Date())
  const [close,setClose]=useState(new Date())
  const [records,setRecords]=useState([])
  const [dialog,setDialog]=useState(false)
  const [myscore,setMyscore]=useState(null)

  const navigate=useNavigate()

  useEffect(()=>{
    axios.get(BASE_URL+'point/my',{params:{userId:userInfo.id}})
    .then(res=>setMyscore(res.data.data.point))
    .catch(err=>console.log(err))
  },[userInfo.id])

  function getRecord(){
    const params={
      startTime:`${open.getFullYear()}-${open.getMonth()+1}-${open.getDate()}`,
      endTime:`${close.getFullYear()}-${close.getMonth()+1}-${close.getDate()+1}`,
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
        <Grid container spacing={2} marginTop={5}>
          <Grid item xs={12} lg={8} align="center">
          <Box sx={{ border:1,borderRadius:1,borderColor:'#D3E4CD', marginBottom:'5rem', marginTop:'3rem', height:'12rem', width:{xs:300,sm:600}}}  >
              <div style={{paddingTop:'1.5rem', display:'flex', flexDirection:'column', paddingLeft:'5rem'}}>
              <h1 style={{ fontSize: '2.5rem', marginBottom:'0.5rem', fontWeight:'bold' }}>당신의 점수는</h1>
              <h1 style={{ fontSize: '2.5rem', marginBottom:'0.5rem', fontWeight:'bold' }}>{myscore}점입니다</h1>
                <div className="d-flex justify-content-end">
                <Button onClick={()=>navigate('/rooms')} style={{width:'10rem', backgroundColor:'#ADC2A9', color:'white', weight:'bold', marginRight:'5rem' }}>점수 쌓으러가기</Button>
                </div>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
          <div className='text-center'>
            <h1 style={{ fontSize: '2.5rem', marginBottom:'1rem', fontWeight:'bold' }}><FontAwesomeIcon icon={faCrown}/> 연간 랭킹 Top 5</h1>
          </div>
            <Rank/>
          </Grid>
        </Grid>
        <div className='text-center'>
        <h1 style={{ fontSize: '3rem', marginTop:'4rem', marginBottom:'1rem', fontWeight:'bold' }}>나의 운동기록 검색하기</h1>
      </div>
        <Grid container spacing={2} margintTop={0} marginBottom={3}>
          <Grid item  xs={12} lg={3} marginTop={2}  align='center' >
            <ResponsiveDatePickers value={open} setValue={setOpen} which={'시작날짜'}/>
            <br/>
            <br />
            <ResponsiveDatePickers value={close} setValue={setClose} which={'종료날짜'}/>
            <br />
            <br/>
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