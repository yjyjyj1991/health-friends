import { Grid, TextField, Button, Typography } from "@mui/material"
import { useState } from "react"

export default function ChangePwForm(){
  const BASE_URL='https://i6d204.p.ssafy.io/api/'
  const [isPwValid,setIsPwValid]=useState(null)
  const [isPw2Valid,setIsPw2Valid]=useState(null)
  const [pw,setPw]=useState(null)
  const [pw2,setPw2]=useState(null)
  const [msg,setMsg]=useState(null)

  function handleSubmit(e){
    e.preventDefault()
    //BE에서 비밀번호 변경 api 구현필요
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
        {msg&&<Typography color='secondary'>{msg}</Typography>}
      </Grid>

    </Grid>
  )
}