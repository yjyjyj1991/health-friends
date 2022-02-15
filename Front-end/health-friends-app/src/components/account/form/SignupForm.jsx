import { Grid,InputAdornment ,TextField, Button, Typography, } from "@mui/material";
import { useState, } from "react";
import axios from 'axios';

export default function SignupForm(props){
  const {setDialog}=props

  const [email, setEmail]=useState(null)
  const [nickname,setNickname]=useState(null)
  const [pw, setPw]=useState(null)
  const [pw2, setPw2]=useState(null)

  const [isEmailValid, setIsEmailValid]=useState(null)
  const [isNicknameValid, setIsNicknameValid]=useState(null)
  const [isPwValid, setIsPwValid]=useState(null)
  const [isPw2Valid, setIsPw2Valid]=useState(null)

  const [code, setCode]=useState(null)

  var isAllValid = isEmailValid==='사용가능'&&isNicknameValid==='사용가능'&&!isPwValid&&!isPw2Valid &&pw&&pw2
  const BASE_URL='https://i6d204.p.ssafy.io/api/'

  function validate(e){
    const value=e.target.value
    switch (e.target.name) {
      case 'email':
        if (!value){setIsEmailValid(null); return
        } else if (/.+@[^.]+\.[^.]+$/.test(value)){setIsEmailValid('유효'); return  
        } 
        setIsEmailValid('유효하지않음')
        break;
      case 'nickname':
        if (!value) {setIsNicknameValid(null); return} 
        else if (value.length>10) {setIsNicknameValid('10자 이내로 지어주세요'); return} 
        else {setIsNicknameValid(null)}
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
        } else if (value!==pw) {setIsPw2Valid('invalid'); return
        } else {
          setIsPw2Valid(null);
        }
        break
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
    setIsNicknameValid(null)
    setNickname(e.target.value)
    validate(e)
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
  function verifyEmail(e){
    axios.get(BASE_URL+'users/exists/email', {params:{email:email}})
    .then((res) => {res.status===200 && setIsEmailValid('사용가능')})
    .catch((err) => {console.log(err); setIsEmailValid('사용중');})
  }
  function verifyNickname(e){
    if (nickname.length>10) return
    axios.get(BASE_URL+'users/exists/nickname', {params:{nickname:nickname}})
    .then((response) => response.status===200 && setIsNicknameValid('사용가능'))
    .catch(() => {setIsNicknameValid('사용중');})
  }
  function sendCode(e){
    setIsEmailValid(null)
    setIsNicknameValid(null)
    setIsPwValid(null)
    setIsPw2Valid(null)
    e.preventDefault();
    axios.get(BASE_URL+'users/verify', {params:{email:email}})
    .then((res) => {setCode(res.data.data)})
    .catch((err)=>console.log(err) )
  }
    
  function checkCode(e){
    if (code!==e.target.value) return
    axios.post(BASE_URL+'users',{nickname:nickname,email:email,name:'홍길동',password:pw})
    .then(res=>{alert('회원등록완료')
    setDialog('login')} )
  }

  return (
    <Grid 
      container
      component='form'
      spacing={2}
      padding={5}
      onSubmit={sendCode}
    > 
      <Grid item xs={12}><Typography align="center" variant="h2">회원가입</Typography></Grid>
      <Grid item xs={12} sx={{display:'flex',}}>
        <TextField
          required
          label="이메일"
          name='email'
          fullWidth
          onChange={handleEmailChange}
          error={isEmailValid==='유효하지않음'||isEmailValid==='사용중입니다'}
          helperText={isEmailValid}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <Button variant='contained' disabled={!email||isEmailValid==='유효하지않음'}
                onClick={verifyEmail}>Check</Button>
              </InputAdornment>
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{display:'flex',}}>
        <TextField
          required
          label="닉네임"
          name='nickname'
          fullWidth
          onChange={handleNicknameChange}
          error={isNicknameValid==='사용중입니다' || isNicknameValid==='10자 이내로 지어주세요'}
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
          label="비밀번호"
          name='pw'
          fullWidth
          onChange={handlePwChange}
          error={isPwValid==='invalid'}
          helperText={isPwValid && '8~16자 이내 | 문자,숫자,특수문자 포함'}
        />
      </Grid>
      <Grid item xs={12} sx={{display:'flex',}}>
        <TextField
          type='password'
          required
          label="비밀번호확인"
          name='pw2'
          fullWidth
          onChange={handlePw2Change}
          error={isPw2Valid==='invalid'}
          helperText={isPw2Valid&&'불일치'}
        />
      </Grid>

      <Grid item xs={Boolean(code)?6:12}>
        <Button fullWidth size="large" type="submit" variant='contained' disabled={!isAllValid}
        onClick={sendCode}>이메일인증</Button>
      </Grid>
      {code &&
        <Grid item xs={6}>
          <TextField fullWidth size="small" label='발송된 코드를 입력해주세요' onChange={checkCode}/>  
        </Grid>
      }
      
    </Grid>  
  )

}