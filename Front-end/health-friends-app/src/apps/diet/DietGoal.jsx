import { Grid,TextField,Typography,Select, MenuItem,FormControl,InputLabel } from "@mui/material"
import { useState } from "react"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
// 다이어트 할때 계산 방법
// 단백질 : 몸무게 (파운드 값) * 1.1
// 지방 : 몸무게 (파운드 값) * 0.3
// 탄수화물 : (칼로리 - (단백질 *4 + 지방 * 9))/4 
// 린메스업 할 때 계산 방법
// 단백질 : 몸무게 (파운드 값) * 0.9
// 지방 : 몸무게 (파운드 값) * 0.4
// 탄수화물 : (칼로리 - (단백질 *4 + 지방 * 9))/4 
// 유지 할때는
// 탄수화물: (칼로리 총량의 50%) 
// 단백질 : (칼로리 총량의 25%) 
// 지방 : ((칼로리 총량의 * 0.25) * (4/9))

// 유지 칼로리 구하는 법 : (몸무게(파운드 값으로) * 10 ) *(Active_Point DB에서 받아온 값(1.3~1.8))
// 다이어트 칼로리 구하는 법 : (몸무게(파운드 값으로) * 10 ) *(Active_Point DB에서 받아온 값(1.3~1.8)) - 300
// 린 메스업 칼로리 구하는 법 : (몸무게(파운드 값으로) * 10 ) *(Active_Point DB에서 받아온 값(1.3~1.8)) + 200
export default function DietDialog(props) {
  const [purpose,setPurpose]=useState(null)  
  const [activePoint,setActivePoint]=useState(null)
  const [weight,setWeight]=useState(null)
  const BASE_URL='https://i6d204.p.ssafy.io/api/'

  const handleClose = () => {
    props.close();
  };
  function okay(){
    axios.put(BASE_URL+'users',{
      activePoint:activePoint,
      id:JSON.parse(localStorage.getItem('user')).userInfo.id,
      purposeId:purpose,
      weight:weight,
    })
    .then(res=>console.log(res))
    .catch(err => console.log(err))
    props.close()
  }
  function purposeChange(e){
    setPurpose(e.target.value);
  }
  function weightChange(e){
    setWeight(e.target.value);
  }
  function activePointChange(e){
    setActivePoint(e.target.value);
  }

  return (
    <Dialog open={props.dialog} onClose={handleClose}>
      <DialogContent>
      <Grid container spacing={2} padding={2}>
        <Grid item display='flex' justifyContent='center' xs={12}>
          <Typography fontSize='large'>적정섭취량을 알려드립니다</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">목표를 선택해주세요</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={purpose}
              label="목표"
              onChange={purposeChange}
            >
              <MenuItem value={1}>린매스업</MenuItem>
              <MenuItem value={2}>벌크업</MenuItem>
              <MenuItem value={3}>다이어트</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
          <InputLabel id="select-label">활동량을 선택해주세요</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={activePoint}
            label="목표"
            onChange={activePointChange}
          >
            <MenuItem value={1.3}>매우 적음</MenuItem>
            <MenuItem value={1.4}>적음</MenuItem>
            <MenuItem value={1.5}>보통</MenuItem>
            <MenuItem value={1.6}>활발</MenuItem>
            <MenuItem value={1.8}>매우 활발</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField 
          required
          onChange={weightChange}
          label="몸무게"
          name='weight'
          fullWidth/>
        </Grid>
      </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={okay}>설정</Button>
      </DialogActions>
    </Dialog>
  );
}