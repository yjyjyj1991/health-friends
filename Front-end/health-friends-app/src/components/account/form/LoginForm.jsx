// import { useState } from "react";
import { TextField, Button, Typography, } from "@mui/material";
import { Grid } from "@mui/material";
import axios from "axios";
import { useState,useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {AuthContext} from '../Auth'

export default function LoginForm(props){
  const [msg,setMsg]=useState(null)
  const {setDialog} = props 
  const BASE_URL='https://i6d204.p.ssafy.io/api/'
  const navigate=useNavigate()
  let location = useLocation()
  let auth = useContext(AuthContext)


  function handleSubmit(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    axios.post(BASE_URL+'users/login',{email: data.get('email'),password: data.get('password'),})
    .then((res)=>{
    if (res.data.success) {
      auth.login(res.data.data)
      navigate(location)
      setDialog(null)
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.accessToken}`;
      } else {setMsg('이메일 또는 비밀번호를 확인해주세요')}})
    .catch((err)=>console.log(err))
    }

  return (
    <Grid 
      maxWidth={500}
      container
      spacing={2}
      padding={2}
      component='form' onSubmit={handleSubmit}
      sx={{ maxWidth: 'sm' }}
    > 
      <Grid item xs={12}><Typography align="center" variant="h2">로그인</Typography></Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="이메일"
          name="email"
          autoComplete="email"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          required
          type='password'
          label="패스워드"
          name="password"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} marginTop={1}>
        <Button type='submit' fullWidth variant="contained" >Login</Button>
        {msg&&<Typography color='secondary'>{msg}</Typography>}
      </Grid>

      {/* <Grid item xs={12} sx={{display:'flex', justifyContent:'space-between', }}>        
        <Button size="small" onClick={renderResetForm} >비밀번호를 잊어버렸나요?</Button>
      </Grid> */}
    </Grid>
  )

}