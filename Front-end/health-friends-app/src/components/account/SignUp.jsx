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
// import { useState } from 'react';


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

// const validate = values => {
//   const errors = {};
//   if (!values.name) {
//     errors.name = 'Required';
//   } else if (values.name.length > 15) {
//     errors.name = 'Must be 15 characters or less';
//   }

//   if (!values.nickName) {
//     errors.nickName = 'Required';
//   } else if (values.nickName.length > 15) {
//     errors.nickName = 'Must be 15 characters or less';
//   }

//   if (!values.email) {
//     errors.email = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }

//   if (!values.password) {
//     errors.password = 'Required';
//   } else if (values.password.length > 15) {
//     errors.password = 'Must be 15 characters or less';
//   }

//   if (!values.passwordRe) {
//     errors.passwordRe = 'Required';
//   } else if (values.passwordRe.length > 15) {
//     errors.passwordRe = 'Must be 15 characters or less';
//   }

//   return errors;
// };



export default function SignUp() {
  // const [isEmailValid, setIsEmailValid] = useState(false);

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
    onSubmit: values => {
      //닉네임중복확인
      //email중복확인
      //이메일인증
      
      console.log(JSON.stringify(values, null, 2))
      
      axios.post('http://suho.asuscomm.com/users',values)
      .then(e=>console.log(e))
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
            <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
              <TextField
                name="nickname"
                required
                fullWidth
                id="nickname"
                label="닉네임"
                onChange={formik.handleChange}
                value={formik.values.nickname}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nickname &&formik.errors.nickname ? <div>{formik.errors.nickname}</div> : null}
            </Grid>
            
            <Grid item xs={12}>
              <TextField 
                required
                fullWidth
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
          >
            Sign Up
          </Button>
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