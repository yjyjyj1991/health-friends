import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function SignUp() {
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const [validationCode, setValidationCode] = useState('')
  const BASE_URL = 'http://i6d204.p.ssafy.io:8888/'

  const handleNicknameChange = (e) => {
    setIsNicknameValid(false)
    formik.handleChange(e)
  }
  
  const checkNickname= () => {
    const nickname=formik.values.nickname
    if (!nickname) {return}
    const newURL = BASE_URL+'users/exists/nickname'
    axios.get(newURL, {params:{nickname:nickname} })
    .then((response) => response.status===200 ? setIsNicknameValid(true) : null )
    .catch(() => {setIsNicknameValid('exist');})
  }

  const sendEmail= () => {
    const email=formik.values.email
    if (!email) {return}
    const newURL = BASE_URL+'users/exists/email'
    axios.get(newURL, {params:{email:formik.values.email} })
    .then((response) => {
      if (response.status===200) {
        setIsEmailValid(true)
        const newURL = BASE_URL+'users/verify'
        axios.get(newURL, {params:{email:email} })
        .then(res => {setValidationCode(res.data.data)})
      }
    })
    .catch(() => {setIsEmailValid('exist');})
  }

  const checkCode = (e) =>{
    if (e.target.value===validationCode){
      const newURL = BASE_URL+'users'
      axios.post(newURL, 
        {
          "activePoint": 0,
          "email": "string",
          "name": "string",
          "nickname": "string",
          "password": "string",
          "purposeId": 0,
          "weight": 0
        })
      .then((response) => {
        console.log(response)
        window.location.assign('http://localhost:3000');
      })
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      nickname: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required')
        .min(8, 'Must be 8 characters or more')
        .matches(/[A-Za-z]/,'문자를 포함해야합니다')
        .matches(/\d/,'숫자를 포함해야합니다')
        .matches(/\W/,'특수문자를 포함해야합니다'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: () => {
      sendEmail()
      
    },
  });

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component='form' onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="이름"
                onChange={formik.handleChange}
                value={formik.values.name}
                autoFocus
                onBlur={formik.handleBlur}
                
              />
              {formik.touched.name &&formik.errors.name ? <div>{formik.errors.name}</div> : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="nickname"
                required
                
                id="nickname"
                label="닉네임"
                onChange={handleNicknameChange}
                value={formik.values.nickname}
                onBlur={formik.handleBlur}
              />
              <Button onClick={checkNickname}>중복확인</Button>
              {isNicknameValid===true ? <p>사용가능한 닉네임입니다</p> : null }
              {isNicknameValid==='exist' ? <p>중복된 닉네임입니다</p> : null }
              
          
              {formik.touched.nickname &&formik.errors.nickname ? <div>{formik.errors.nickname}</div> : null}
            </Grid>
            
            
            <Grid item xs={12}>
              <TextField 
                required
                // fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />              
              {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                
              />
              {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="passwordConfirm"
                label="비밀번호확인"
                type="password"
                name="passwordConfirm"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
                onBlur={formik.handleBlur}
              />
              {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? <div>{formik.errors.passwordConfirm}</div> : null}
            </Grid>

            <Grid item xs={12} >
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label='개인정보의 수집 및 이용 동의' 
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={formik.onSubmit}
          >
            메일로 인증코드보내기
          </Button>
          {isEmailValid===true ? <TextField onChange={checkCode} /> : null}
          {isEmailValid==='exist' ? <p>이미 사용된 이메일입니다</p> : null}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>

  );
}