import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Table from 'react-bootstrap/Table'
import './Board.css'; 
import axios from 'axios'
// import logo from './logo.png';
import Accordion from 'react-bootstrap/Accordion'
// import IconButton from '@mui/material/IconButton';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const Board = () => {
  const [posts, setPosts] = useState([]);
  // const [open, setOpen] = React.useState(false);
  
  useEffect(() => {
    axios
      .get('https://i6d204.p.ssafy.io/api/boards')
      // .then((Response)=>{
      //   setPosts(Response.data)
      //   console.log(Response.data);})
      .then(({data})=>{
        setPosts(data)
        console.log(data);})
      .catch((Error)=>{
        console.log(Error);})
  },[]);
  return (
    <div sytle={{minHeight:'100vh'}}>
      <Header/>
      <div className='container_board'>
        <div className='text-center'>
          <h1 style={{ fontSize: '5rem' }}>공지사항</h1>
        </div>
        <div>
        </div>
        <div className="table_board">
          <Table hover size="sm">
            <thead>
              <tr className="text-center">
                <th>번호</th>
                <th>제목</th>
                <th>등록일</th>
              </tr>
            </thead>
            <tbody >

                {/* {posts.data && posts.data.map((post, index) => (
                    <tr key={index}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.date}</td>
                    </tr>
                ))} */}
                {posts.data && posts.data.map((post, index) => (
                  <tr key={index}>
                    <td>{post.id}</td>
                    <td><Accordion>
                        <Accordion.Item eventKey={index}>
                        <Accordion.Header>{post.title}</Accordion.Header>
                        <Accordion.Body>{post.title} content들어가면된다</Accordion.Body>
                        </Accordion.Item>
                        </Accordion></td>
                    <td>{post.date}</td>
                  </tr>
                ))}
                {/* {posts.data && posts.data.map((post, index) => (
                  <Accordion>
                  <Accordion.Item eventKey={index}>
                  <Accordion.Header>
                  <tr key={index}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.date}</td>
                    </tr>
                  </Accordion.Header>
                  <Accordion.Body>{post.title}</Accordion.Body>
                  </Accordion.Item>
                  </Accordion>
                ))} */}
                

            </tbody>
          </Table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};


export default Board;

