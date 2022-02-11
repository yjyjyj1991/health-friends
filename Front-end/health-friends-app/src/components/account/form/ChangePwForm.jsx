import { Grid, TextField, Button, Typography } from "@mui/material"
import { useState, useContext } from "react"
import axios from 'axios'

export default function ChangePwForm(props){
  const BASE_URL='https://i6d204.p.ssafy.io/api/'
  const [isPwValid,setIsPwValid]=useState(null)
  const [isPw2Valid,setIsPw2Valid]=useState(null)
  const [pw,setPw]=useState(null)
  const [pw2,setPw2]=useState(null)
  const [msg,setMsg]=useState(null)

  function handleSubmit(e){
    e.preventDefault()
    const data=new FormData(e.target)
    const data1={id:JSON.parse(localStorage.getItem('user')).userInfo.id,
      newPassword:data.get('newPw'),
      oldPassword:data.get('pw')}
    console.log(data1);
    axios.put(BASE_URL+'/users/update-password',data1) 
    .then(res=>{
      console.log(res);
      if (res.data.success) {alert('비밀번호가 변경되었습니다');props.setDialog(null)}
      else {setMsg('비밀번호를 확인해주세요')}})
    .catch(err=>console.log(err))
  }
  function handlePwChange(e){
    setPw(e.target.value)
    if (pw2&&e.target.value!==pw2) {setIsPw2Valid('invalid')} else {setIsPw2Valid(null)}
    validate(e)
  }
  function handlePw2Change(e){
    setPw2(e.target.value)
    validate(e)
  }
  function validate(e){
    const value=e.target.value
    switch (e.target.name) {
      case 'newPw':
        if (!value || (/\d/.test(value) && /[A-Za-z]/.test(value) && /\W/.test(value) && 
        value.length>=8 && value.length<=16) ) {
          setIsPwValid(null)
          return
        }
        setIsPwValid('invalid')
        break;
      case 'newPw2':
        if (!value) {setIsPw2Valid(null); return
      } else if (value!==pw) {setIsPw2Valid('invalid'); return
      } else {
        setIsPw2Valid(null);
      }
        break;
      default:
        break;
    }
  }

  return (
    <Grid 
      container
      spacing={2}
      padding={2}
      component='form' onSubmit={handleSubmit}
    > 
      <Grid item xs={12}><Typography align="center" variant="h2">비밀번호변경</Typography></Grid>
      <Grid item xs={12}>
        <TextField 
          required
          type='password'
          label="비밀번호"
          name="pw"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          required
          type='password'
          label="새 비밀번호"
          name="newPw"
          fullWidth
          onChange={handlePwChange}
          error={isPwValid==='invalid'}
          helperText={isPwValid && '8~16자 이내 | 문자,숫자,특수문자 포함'}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          required
          type='password'
          label="새 비밀번호 확인"
          name="newPw2"
          fullWidth
          onChange={handlePw2Change}
          error={isPw2Valid==='invalid'}
          helperText={isPw2Valid&&'불일치'}
        />
      </Grid>
      <Grid item xs={12} marginTop={1}>
        <Button type='submit' fullWidth variant="contained" >비밀번호변경</Button>
        {msg&&<Typography color='danger' fontSize='large'>{msg}</Typography>}
      </Grid>

    </Grid>
  )
}