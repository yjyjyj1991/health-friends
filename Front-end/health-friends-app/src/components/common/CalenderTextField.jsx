import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function ResponsiveDatePickers(props) {
  const {value, setValue, which} = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        inputFormat={'yyyy-MM-dd'}
        disableFuture
        label={which}
        openTo="day"
        views={['year', 'month', 'day']}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} sx={{margin:2}} 
          helperText={which==='시작날짜'?'시작날짜를 선택해주세요':'종료날짜를 선택해주세요'}/>}
      />
    </LocalizationProvider>
  );
}
