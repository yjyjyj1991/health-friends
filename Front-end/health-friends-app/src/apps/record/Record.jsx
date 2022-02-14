import ResponsiveDatePickers from "components/common/CalenderTextField"
import {Button, Grid, Box} from '@mui/material'
import { useState,  } from "react"
import axios from "axios"
import BasicTable2 from "./BasicTable"


export default function Record(){
  const userInfo=JSON.parse(localStorage.getItem('user')).userInfo
  const [open,setOpen]=useState(new Date())
  const [close,setClose]=useState(new Date())
  const [records,setRecords]=useState([])
  const BASE_URL='https://i6d204.p.ssafy.io/api/'

  function getRecord(){
    const params={
      openTime:`${open.getFullYear()}-${open.getMonth()+1}-${open.getDate()}`,
      closeTime:`${close.getFullYear()}-${close.getMonth()+1}-${close.getDate()}`,
      // userId:userInfo.id,
      userId:1,
    }
    axios.get(BASE_URL+'exercise',{params:params})
    .then(res=>{
      setRecords(res.data.data)
    })
    .catch(err=>console.log(err))
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} margin={3}>
        <ResponsiveDatePickers value={open} setValue={setOpen} which={'시작날짜'}/>
        <br />
        <ResponsiveDatePickers value={close} setValue={setClose} which={'종료날짜'}/>
      </Grid>
      <Grid item>
        <Button variant="contained" sx={{fontSize:20}} onClick={getRecord}>검색</Button>
      </Grid>
      <Grid item>
        <BasicTable2 records={records} />
      </Grid>
    </Grid>
  )
}