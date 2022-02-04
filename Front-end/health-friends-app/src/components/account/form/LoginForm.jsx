// import { useState } from "react";
import { TextField, Button, Typography, } from "@mui/material";
import { Grid } from "@mui/material";
import axios from "axios";
import { useState,useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {AuthContext} from '../AuthProvider'

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
      localStorage.setItem("user", JSON.stringify(res.data.data))
      auth.login(res.data.data)
      navigate(location)
      setDialog(null)
      } else {setMsg('check email or password')}})
      .then(err=>console.log(err))
    }

  function renderResetForm(){
    setDialog('reset')
  }

  return (
    <Grid 
      container
      spacing={2}
      padding={2}
      component='form' onSubmit={handleSubmit}
    > 
      <Grid item xs={12}>
        <TextField
          required
          label="Email Address"
          name="email"
          variant="standard"
          autoComplete="email"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          required
          type='password'
          label="password"
          name="password"
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} marginTop={1}>
        <Button type='submit' fullWidth variant="contained" >Login</Button>
        {msg&&<Typography color='secondary'>{msg}</Typography>}
      </Grid>

      <Grid item xs={12} sx={{display:'flex', justifyContent:'space-between', }}>        
        <Button size="small" onClick={renderResetForm} >Forgot password?</Button>
      </Grid>
    </Grid>
  )

}