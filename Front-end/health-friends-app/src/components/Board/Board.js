import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Moment from 'react-moment';
import AppBar from '../appbar/AppBar';
import Footer from '../Footer/Footer';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
      <React.Fragment>
        <TableRow sx={{ borderBottom: 'set'}} onClick={() => setOpen(!open)}>
          <TableCell style={{ border:'none'}}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon/>  : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>

          <TableCell align="center" style={{ fontSize:'1.5rem', fontWeight:'bold', border:'none' }}>1</TableCell>
          <TableCell align="left" style={{ fontSize:'1.5rem', fontWeight:'bold', border:'none' }} >{row.title}</TableCell>
          <TableCell align="center" style={{ fontSize:'1.5rem', fontWeight:'bold', border:'none' }}>
          <Moment format="YYYY-MM-DD">{row.date}</Moment></TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                </Typography>
                <Table aria-label="purchases">
                    <TableHead className='container-fluid'>
                      <TableRow>
                      <TableCell className='col-2' style={{ border: 'none' }}></TableCell>
                        <TableCell className='col-8' style={{ border: 'none', fontSize:'1.5rem', height:'10rem' }}>
                        <pre style={{ backgroundColor:'white', border:'none' }}>&nbsp;{row.content}</pre> </TableCell>
                        <TableCell  className='col-2'  style={{ border: 'none' }}></TableCell>
                      </TableRow>
                    </TableHead>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>

  );
}

export default function CollapsibleTable() {
  const [posts, setPosts] = useState([]);
  const [dialog, setDialog] = useState(null)
  
  useEffect(() => {
    axios
      .get('https://i6d204.p.ssafy.io/api/boards')
      .then(({data})=>{
        setPosts(data)
        // console.log(data);
      })
      // .catch((Error)=>{
      //   console.log(Error);
      // })
  },[]);
  return (

  <div style={{display: 'flex', flexDirection:'column', minHeight:'100%'}}>
    <AppBar dialog={dialog} setDialog={setDialog} />
    <div style={{flex:'1'}} >
      <div className='text-center'>
        <h1 style={{ fontSize: '5rem', marginTop:'5rem', marginBottom:'5rem', fontWeight:'bold' }}>공지사항</h1>
      </div>
      <div className="container">
        <TableContainer style={{ marginBottom:'10rem' }}>
          <Table aria-label="collapsible table">
            <TableHead className="row"  >
              <TableRow >
                <TableCell className="col-1" style={{ borderColor :'#99A799' }}></TableCell>
                <TableCell className="col-2" align="center" style={{ fontSize:'2rem', fontWeight:'bold', color:"#99A799", borderColor:'#99A799' }}>번호 </TableCell>
                <TableCell className="col-7" align="center" style={{ fontSize:'2rem', fontWeight:'bold', color:"#99A799", borderColor:'#99A799' }}>제목</TableCell>
                <TableCell className="col-2" align="center" style={{ fontSize:'2rem', fontWeight:'bold', color:"#99A799", borderColor:'#99A799' }}>등록일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {posts.data && posts.data.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    <Footer/>
  </div>

  );
}