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
      <Table sx={{ minWidth: 650, backgroundColor:'lightseagreen'}} aria-label="simple table">
        <TableHead>
          <TableRow sx={{backgroundColor:'seagreen'}}>
            <TableCell sx={{fontSize:20}}>종목</TableCell>
            <TableCell sx={{fontSize:20}}>시작시각</TableCell>
            <TableCell sx={{fontSize:20}}>종료시각</TableCell>
            <TableCell sx={{fontSize:20}}>운동시간</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow
              key={record.openTime}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {record.type}
              </TableCell>
              <TableCell >{record.openTime}</TableCell>
              <TableCell >{record.closeTime}</TableCell>
              <TableCell >{Math.round((Date.parse(record.closeTime)-Date.parse(record.openTime))/3600000)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
