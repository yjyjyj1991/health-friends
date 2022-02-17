import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useEffect,useState } from 'react';
import { BASE_URL } from 'common/Properties';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker';

export default function StaticDatePickerDemo(props) {
  const {setList, userId, date, setDate}=props
  
  useEffect(()=>{
    const data = {
      date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
      userId:userId,
    }
    axios.get(BASE_URL+'foodmanagement',{params:data})
    .then(res=>{
      if (res.data.data) {setList(res.data.data)}
      else {setList([])}
    })
    .catch(err=>console.log(err))
  },[setList,date,userId])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        // openTo="day"
        inputFormat={'yyyy-MM-dd'}
        label="Date"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}