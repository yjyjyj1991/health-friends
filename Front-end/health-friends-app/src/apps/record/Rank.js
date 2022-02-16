/*eslint-disable*/
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect, Component } from "react";
import axios from 'axios';



class Rank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      point: [],
      userId: [],
      rows: [],
    };
  }

  createData( rank, title, type) {
    return { rank, title, type };
  }
  
  componentDidMount() {
    var count = 0;
    axios
      .get('https://i6d204.p.ssafy.io/api/point')
      .then(({data})=>{
         this.setState({
           rows : data.data
         })
         console.log('point', this.userInfo);
      })
      .catch((Error)=>{
         console.warn(Error);
      })
  };
  render() {
  return (
        
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{backgroundColor:"#D3E4CD", }}>
              <TableCell sx={{fontSize:{sx:'1rem',md:'1.5rem'}, fontWeight: 'bold'}} align="center">유저</TableCell>
              <TableCell sx={{fontSize:{sx:'1rem',md:'1.5rem'}, fontWeight: 'bold'}} align="center">점수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "white", }}
              >
                <TableCell sx={{fontSize:{sx:'0.5rem',md:'1.2rem'}, fontWeight: 'bold'}} align="center">{row.nickname} </TableCell>
                <TableCell sx={{fontSize:{sx:'0.5rem',md:'1.2rem'}, fontWeight: 'bold'}} align="center">{row.point}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default Rank;