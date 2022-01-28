import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Table from 'react-bootstrap/Table'
import './Board.css'; 
import axios from 'axios'



const Board = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get('http://i6d204.p.ssafy.io:8888/boards')
      // .then((Response)=>{
      //   setPosts(Response.data)
      //   console.log(Response.data);})
      .then(({data})=>{
        setPosts(data)
        console.log(data);})
      .catch((Error)=>{
        console.log(Error);})
  }, [])
  return (
    <div>
      <Header/>
      <div className='container_board'>
        <div className='text-center'>
          <h1 style={{ fontSize: '5rem' }}>공지사항</h1>
        </div>
        <div>
          <button></button>
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
              {/* <tr> */}
                {posts.data.map((post, index) => (
                  <tr key={index}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                  </tr>
                ))}
              {/* </tr> */}
            </tbody>
          </Table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

// const Post = (post) => {
//   return (
//     <div>
//       <tr>
//         <td>{}</td>
//         <td>{post.title}</td>
//         <td>{post.id}</td>
//       </tr>
//     </div>
//   )
// }

export default Board;

