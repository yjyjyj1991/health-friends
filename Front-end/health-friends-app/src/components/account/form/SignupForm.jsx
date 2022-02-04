import { Grid,InputAdornment ,TextField, Button, Typography, } from "@mui/material";
import { useState } from "react";
import axios from 'axios';

export default function SignupForm(props){
  const {setForm}=props

  const [email, setEmail]=useState(null)
  const [nickname,setNickname]=useState(null)
  const [pw, setPw]=useState(null)
  const [pw2, setPw2]=useState(null)

  const [isEmailValid, setIsEmailValid]=useState(null)
  const [isNicknameValid, setIsNicknameValid]=useState(null)
  const [isPwValid, setIsPwValid]=useState(null)
  const [isPw2Valid, setIsPw2Valid]=useState(null)

  const [code, setCode]=useState(null)
  const [data,setData]=useState(null)

  var isAllValid = isEmailValid==='verified'&&isNicknameValid==='verified'&&!isPwValid&&!isPw2Valid &&pw&&pw2
  const BASE_URL='https://i6d204.p.ssafy.io/api/'

  function validate(e){
    const value=e.target.value
    switch (e.target.name) {
      case 'email':
        if (!value){setIsEmailValid(null); return
        } else if (/.+@[^.]+\.[^.]+$/.test(value)){setIsEmailValid('valid'); return  
        } 
        setIsEmailValid('invalid')
        break;
      case 'pw':
        if (!value || (/\d/.test(value) && /[A-Za-z]/.test(value) && /\W/.test(value) && 
        value.length>=8 && value.length<=16) ) {
          setIsPwValid(null)
          return
        }
        setIsPwValid('invalid')
        break;
      case 'pw2':
        if (!value) {setIsPw2Valid(null); return
      } else if (value!==pw) {setIsPw2Valid('doesn\'t match'); return
      } else {
        setIsPw2Valid(null);
      }
        break;
      default:
        break;
    }
  }

  function handleEmailChange(e){
    setIsEmailValid(null)
    setEmail(e.target.value)
    validate(e)
  }
  function handleNicknameChange(e){
    setNickname(e.target.value)
    setIsNicknameValid(null)
  }
  function handlePwChange(e){
    setPw(e.target.value)
    if (pw2&&e.target.value!==pw2) {setIsPw2Valid('doesn\'t match')} else {setIsPw2Valid(null)}
    validate(e)
  }
  function handlePw2Change(e){
    setPw2(e.target.value)
    validate(e)
  }
  function verifyEmail(e){
    axios.get(BASE_URL+'users/exists/email', {params:{email:email}})
    .then((response) => response.status===200 && setIsEmailValid('verified'))
    .catch(() => {setIsEmailValid('exist');})
  }
  function verifyNickname(e){
    axios.get(BASE_URL+'users/exists/nickname', {params:{nickname:nickname}})
    .then((response) => response.status===200 && setIsNicknameValid('verified'))
    .catch(() => {setIsNicknameValid('exist');})
  }
  function sendCode(e){
    e.preventDefault();
    setData({
      email:email,
      nickname:nickname,
      password:pw,
    })
    axios.get(BASE_URL+'users/verify', {params:{email:email}})
    .then((res) => {console.log(res); setCode(res.data.data)})
    .catch((err)=>console.log(err) )
  }
  function checkCode(e){
    alert('success')
    setForm('login')
  }

  return (
    <Grid 
      container
      component='form'
      spacing={2}
      padding={2}
      // noValidate 
      onSubmit={sendCode}
    > 
      <Grid item xs={12} sx={{display:'flex',}}>
        <TextField
          required
          label="Email"
          name='email'
          fullWidth
          onChange={handleEmailChange}
          // onBlur={handleBlur}
          error={isEmailValid==='invalid'||isEmailValid==='exist'}
          helperText={isEmailValid}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <Button variant='contained' disabled={!email||isEmailValid==='invalid'}
                onClick={verifyEmail}>Check</Button>
              </InputAdornment>
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{display:'flex',}}>
        <TextField
          required
          label="Nickname"
          name='nickname'
          fullWidth
          onChange={handleNicknameChange}
          // onBlur={handleBlur}
          error={isNicknameValid==='exist'}
          helperText={isNicknameValid}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <Button variant='contained' disabled={!nickname}
               onClick={verifyNickname}>Check</Button>
              </InputAdornment>
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{display:'flex',}}>
        <TextField
          type='password'
          required
          label="Password"
          name='pw'
          fullWidth
          onChange={handlePwChange}
          // onBlur={handleBlur}
          error={isPwValid==='invalid'}
          helperText={isPwValid}
        />
      </Grid>
      <Grid item xs={12} sx={{display:'flex',}}>
        <TextField
          type='password'
          required
          label="Password Confirm"
          name='pw2'
          fullWidth
          onChange={handlePw2Change}
          error={isPw2Valid==='doesn\'t match'}
          helperText={isPw2Valid}
        />
      </Grid>

      <Grid item xs={Boolean(code)?6:12}>
        <Button fullWidth size="large" type="submit" variant='contained' disabled={!isAllValid}
        onClick={sendCode}>Verify Email</Button>
      </Grid>
      {code &&
        <Grid item xs={6}>
          <TextField size="small" label='Code sent to email' onChange={checkCode}/>  
        </Grid>
      }
      
    </Grid>  
  )

}