import { InputAdornment, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ResetForm(props){
  const {setDialog}=props
  const BASE_URL='https://i6d204.p.ssafy.io/api/'
  const [email,setEmail]= useState(null)
  const [msg,setMsg]=useState('이메일로 새 비밀번호를 받습니다')
  
  function handleChange(e){
    setEmail(e.target.value)
  }
  function sendEmail(e){  
    axios.put(BASE_URL+'users/reset-password/', {params:{email:email}})
    .then((res) => {console.log(res)
    setMsg('성공적으로 보냈습니다')
    setTimeout(() => {setDialog('login')}, 1000)})
    .catch(err=>{console.log(err);setMsg('실패')})
  }

  return (
  <Box sx={{padding:'20px'}}>
    <TextField
      size="small"
      required
      onChange={handleChange}
      label="Enter email"
      name='email'
      fullWidth
      helperText={msg}
      InputProps={{
        endAdornment: <InputAdornment position="end">
          <Button variant='contained' size='small'
            onClick={sendEmail}>send</Button>
        </InputAdornment>
      }}
    />
  </Box>
  )
}