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
    this.userInfo = JSON.parse(localStorage.getItem('user'))['userInfo'];
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
         console.log(this.userInfo);
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
            <TableRow sx={{backgroundColor:"beige", fontSize: "20"}}>
              <TableCell align="center">유저</TableCell>
              <TableCell align="center">점수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#FEF5ED", fontSize:"20"}}
              >
                <TableCell align="center">{row.nickname} </TableCell>
                <TableCell align="center">{row.point}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default Rank;