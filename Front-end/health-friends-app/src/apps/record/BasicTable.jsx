import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable2(props) {
  const {records}=props
  return (
    <TableContainer component={Paper}>
      <Table style={{  backgroundColor:'#white', borderColr:'#99A799'}} aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor:'#ADC2A9',}}>
            <TableCell sx={{fontSize:{sx:'1rem',md:'2rem'}, fontWeight: 'bold', textAlign: 'center' }}>종목</TableCell>
            <TableCell sx={{fontSize:{sx:'1rem',md:'2rem'},fontWeight: 'bold',  textAlign: 'center'}}>시작시각</TableCell>
            <TableCell sx={{fontSize:{sx:'1rem',md:'2rem'},fontWeight: 'bold', textAlign: 'center'}}>종료시각</TableCell>
            <TableCell sx={{fontSize:{sx:'1rem',md:'2rem'},fontWeight: 'bold', textAlign: 'center'}}>운동시간(초)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow
              key={record.startTime}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{fontSize:{sx:'0.5rem',md:'1.5rem'}, fontWeight: 'bold', textAlign: 'center' }}> 
                {record.reason}
              </TableCell>
              <TableCell sx={{fontSize:{sx:'0.5rem',md:'1.5rem'}, fontWeight: 'bold', textAlign: 'center' }}>{record.startTime}</TableCell>
              <TableCell sx={{fontSize:{sx:'0.5rem',md:'1.5rem'}, fontWeight: 'bold', textAlign: 'center' }}>{record.endTime}</TableCell>
              <TableCell sx={{fontSize:{sx:'0.5rem',md:'1.5rem'}, fontWeight: 'bold', textAlign: 'center' }}>{record.timeGap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
