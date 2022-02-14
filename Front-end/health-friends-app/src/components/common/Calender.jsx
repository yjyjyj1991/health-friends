import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { useEffect,useState } from 'react';
import { BASE_URL } from 'common/Properties';
import axios from 'axios';


export default function StaticDatePickerDemo(props) {
  const [date, setDate] = useState(new Date())
  const {setList,id}=props
  
  useEffect(()=>{
    const data = {
      date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
      userId:id
    }
    axios.get(BASE_URL+'foodmanagement',{params:data})
    .then(res=>{
      var dailyList=[]
      const dataList = res.data.data
      if (dataList) {
        dataList.forEach(el=>
          {
            const rate=el.newServing/el.servingSize
            dailyList.push({...el,
              kcal:Math.round(el.kcal*rate),
              carbohydrate:Math.round(el.carbohydrate*rate),
              fat:Math.round(el.fat*rate),
              protein:Math.round(el.protein*rate),
            }) 
          }) 
        }
      else {dailyList = []}
      setList(dailyList)
    })
    .catch(err=>console.log(err))
  },[id,setList,date])


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        openTo="day"
        displayStaticWrapperAs="desktop"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}