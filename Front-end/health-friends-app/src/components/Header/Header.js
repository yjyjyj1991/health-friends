import React from "react";
import logo from './logo.png';
import './Header.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";




const Header = () => {
  return (
  <nav className="navbar navbar-expand-lg navgar-fixed-top">
    <div className="container">
      <div className="col-2">
        <a className="navbar-brand navbar-left m-0 p-0 mb-4" href="#home">
          <img src={logo} alt="logo" style={{height: '7rem'}}/> </a>
      </div>
      <div className="col-10">
        <div className="d-flex justify-content-evenly">
          <a className="room nav-link" href="#health" style={{color:'black'}}>헬스장</a>
          <a className="room nav-link" href="#exercise" style={{color:'black'}}>운동기록</a>
          <a className="room nav-link" href="#diet" style={{color:'black'}}>식단</a>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="col-1">
        <Dropdown className="mt-4">
          <Dropdown.Toggle className='user_img' variant="white">
            <FontAwesomeIcon icon={faUserCircle} size="4x" color="black"/>
          </Dropdown.Toggle>
          <Dropdown.Menu className="text-center" align="end">
            <Dropdown.Item href="#/action-1" className="mt-3">내 프로필</Dropdown.Item>
            {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item> */}

            <Dropdown.Item href="#/action-3" className="mt-3">로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>  
      </div>
    </div>
  </nav>
  );
};

export default Header;