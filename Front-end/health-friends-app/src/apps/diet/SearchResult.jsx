import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Button, TextField,InputAdornment } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'

const BASE_URL='https://i6d204.p.ssafy.io/api/'


export default function SearchResult(props) {
  const userInfo = JSON.parse(localStorage.getItem('user')).userInfo
  const [food,setFood]=useState(null)

  function select(e){
    const food = props.result.find(el=>el.foodName===e.target.innerText) 
    setFood(food)
  }
  function addToList(e){
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    const servingSize = data.get('servingSize')
    const data1={
      foodId:food.id,
      servingSize:parseInt(servingSize),
      userId:userInfo.id
    }
    console.log(BASE_URL+'foodmanagement');
    axios.post(BASE_URL+'foodmanagement',data1)
    .then(res=>(console.log(res)
    //리스트에 추가 props.setList
    ))
    .catch(err=>console.log(err))
  }

  return (
    <>
      <Box marginY={1}>
        {props.result.map(el => (
          <Button key={el.id} onClick={select}>{el.foodName}</Button>  
        ))}
      </Box >
      <TextField 
        component='form'
        onSubmit={addToList}
        label='그램 또는 밀리리터'
        name='servingSize'
        helperText={food?`${food.foodName}이 선택되었습니다`:''}
        InputProps={{
        endAdornment: <InputAdornment position="end">
          <Button variant='contained' type='submit'>추가</Button>
          </InputAdornment>
        }}
      />
    </>
  );
}
