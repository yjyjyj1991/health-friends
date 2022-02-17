import { Grid,TextField,Typography,Select, MenuItem,FormControl,InputLabel } from "@mui/material"
import { useState,useContext } from "react"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import { AuthContext } from "components/account/Auth";


export default function DietDialog(props) {
  const [purpose,setPurpose]=useState(1)  
  const [activePoint,setActivePoint]=useState(1.3)
  const [weight,setWeight]=useState(null)
  const auth = useContext(AuthContext) 
  const BASE_URL='https://i6d204.p.ssafy.io/api/'
  

  const handleClose = () => {
    props.close();
  };
  function okay(){
    const user = JSON.parse(localStorage.getItem('user'))
    const data={
      activePoint:activePoint,
      purposeId:purpose,
      weight:weight,
      id:user.userInfo.id,
    }
    axios.put(BASE_URL+'users',data)
    .then(res=>{
      user.userInfo.weight=weight
      user.userInfo.activePoint=activePoint
      user.userInfo.purposeId=purpose
      auth.login(user)
    })
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
    <Dialog open={Boolean(props.dialog)} onClose={handleClose}>
      <DialogContent>
      <Grid container spacing={2} padding={2}>
        <Grid item display='flex' justifyContent='center' xs={12}>
          <Typography fontSize='large'>목표 정하기</Typography>
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
              <MenuItem value={1}>유지</MenuItem>
              <MenuItem value={2}>다이어트</MenuItem>
              <MenuItem value={3}>린매스업</MenuItem>
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