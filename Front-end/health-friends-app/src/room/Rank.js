/*eslint-disable*/
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData( rank, title, type) {
  return { rank, title, type };
}

const rows = [
  createData(1, 'Frozen yoghurt', '플레티넘'),
  createData(2, 'Ice cream sandwich', '골드'),
  createData(3, 'Eclair','골드' ),
  createData(4,'Cupcake', '실버'),
  createData(5,'Gingerbread', '브론즈'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{backgroundColor:"beige", fontSize: "20"}}>
            <TableCell align="center">순위</TableCell>
            <TableCell align="center">닉네임</TableCell>
            <TableCell align="center">레벨</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#FEF5ED", fontSize:"20"}}
            >
              <TableCell align="center">{row.rank} </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
