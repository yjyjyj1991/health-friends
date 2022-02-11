import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
//여기 차트를 가져오자

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>음식</TableCell>
            <TableCell >칼로리&nbsp;(kcal)</TableCell>
            <TableCell >탄수화물&nbsp;(g)</TableCell>
            <TableCell >단백질&nbsp;(g)</TableCell>
            <TableCell >지방&nbsp;(g)</TableCell>
            <TableCell >섭취량&nbsp;(g)</TableCell>
            <TableCell >삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.list.map((row) => (
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
              <TableCell ><Button color='error' variant='contained' size='small'>삭제</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
