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
  createData(1, 'Frozen yoghurt', '요가'),
  createData(2, 'Ice cream sandwich', '헬스'),
  createData(3, 'Eclair','필라테스' ),
  createData(4,'Cupcake', '요가'),
  createData(5,'Gingerbread', '헬스'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">순위</TableCell>
            <TableCell align="center">방 이름</TableCell>
            <TableCell align="center">운동 종류</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
