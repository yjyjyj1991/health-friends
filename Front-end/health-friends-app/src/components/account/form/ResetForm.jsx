import { InputAdornment, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ResetForm(props){
  const {setDialog}=props
  const BASE_URL='https://i6d204.p.ssafy.io/api/'
  const [email,setEmail]= useState(null)
  const [msg,setMsg]=useState('이메일로 새 비밀번호를 받습니다')
  const [disable,setDisable]=useState(false)

  function handleChange(e){
    setEmail(e.target.value)
  }
  function sendEmail(e){  
    setDisable(true)
    axios({
      method: 'put',
      url: BASE_URL+'users/reset-password/'+email,
    })
    .then((res) => {
      if (res.data.success) { setMsg('성공적으로 보냈습니다'); setTimeout(() => {setDialog('login')}, 1500)}
      else {setMsg('이메일을 확인해주세요'); setDisable(false) }}) 
    .catch(err=>{console.log(err);setMsg('실패')})
  }

  return (
    <Grid container width='300px' alignSelf='center' marginTop={5}>
      <Grid item xs={12}>
        <TextField
          required
          onChange={handleChange}
          label="이메일"
          name='email'
          fullWidth
          helperText={msg}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <Button variant='contained' size='small'
                onClick={sendEmail} disabled={disable}>send</Button>
            </InputAdornment>
          }}
        />
      </Grid>
    </Grid>
  )
}