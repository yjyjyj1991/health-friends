import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from 'common/Properties';

export default function BasicTable(props) {
  const {computedList,setList,date,userId}=props
  function removeRow(index){
    if (date.getDate()!==new Date().getDate()){
      alert('오늘의 식단만 삭제할 수 있습니다.')
      return
    }
    axios.delete(BASE_URL+'foodmanagement',{data:{id:computedList[index].id}})
    .then(()=>{
      axios.get(BASE_URL+'foodmanagement',{params:{userId:userId, date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`}})
      .then((res)=>{
        if (res.data.data) {setList(res.data.data)}
        else {setList([])}
      })
      .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
  }
  return (
  <>
    <TableContainer component={Paper} 
      >
      <Table 
      // sx={{  width:{xs:300, sm:600, lg: 600}, }} 
      aria-label="simple table">
        <TableHead sx={{
        backgroundColor:'#D3E4CD', padding:10}}>
          <TableRow >
            <TableCell >음식</TableCell>
            <TableCell >칼로리&nbsp;(kcal)</TableCell>
            <TableCell >탄수화물&nbsp;(g)</TableCell>
            <TableCell >단백질&nbsp;(g)</TableCell>
            <TableCell >지방&nbsp;(g)</TableCell>
            <TableCell >섭취량&nbsp;(g)</TableCell>
            <TableCell >삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {computedList.map((row,index) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.foodName}</TableCell>
              <TableCell >{row.kcal}</TableCell>
              <TableCell >{row.carbohydrate}</TableCell>
              <TableCell >{row.protein}</TableCell>
              <TableCell >{row.fat}</TableCell>
              <TableCell >{row.newServing}</TableCell>
              <TableCell ><Button sx ={{backgroundColor:'#ADC2A9',color:'white', '&:hover':{backgroundColor:'#D3E4CD'}}}
              size='small' onClick={()=>removeRow(index)}>
                삭제
              </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  </>          
  );
}