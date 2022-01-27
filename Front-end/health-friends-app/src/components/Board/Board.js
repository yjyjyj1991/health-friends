import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Table from 'react-bootstrap/Table'
import './Board.css'; 
import axios from 'axios'



const Board = () => {
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
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr><tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
              </tr>

            </tbody>
          </Table>
          {/* <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
  </tbody>
</table> */}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Board;
