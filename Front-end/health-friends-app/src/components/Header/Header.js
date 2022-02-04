import React from "react";
import logo from './logo.png';
import './Header.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { Link,useNavigate } from 'react-router-dom';
import {AuthContext,} from '../account/AuthProvider'
import {useContext,} from 'react'

const Header = (props) => {
  const auth = useContext(AuthContext)
  const {dialog, setDialog}=props
  const navigate=useNavigate()
  function handleLogin(){
    setDialog('login')
  }
  function handleSignup(){
    setDialog('signup')
  }
  function logout(){
    navigate('/')
    localStorage.removeItem('user')
    auth.signout()
  }
  return (
  <nav className="navbar navbar-expand-lg sticky-top">
    <div className="container">
      <div className="col-2">
        <Link to='/'>
          <p className="navbar-brand navbar-left m-0 p-0 mb-4" >
          <img src={logo} alt="logo" style={{height: '7rem'}}/> </p>
        </Link>
      </div>
      <div className="col-10">
        <div className="d-flex justify-content-evenly">
          <Link to='/rooms'>
            <p className="room nav-link" style={{color:'black'} }>헬스장</p>
          </Link>
          <a className="room nav-link" href="#exercise" style={{color:'black'}}>운동기록</a>
          {/* <a className="room nav-link" href="#diet" style={{color:'black'}}>식단</a> */}
          <Link to='/foods'>
            <p className="room nav-link" style={{color:'black'} }>식단</p>
          </Link>
          <Link to='/boards'>
            <p className="room nav-link" style={{color:'black'} }>HELP DESK</p>
          </Link>
        </div>
      </div>
      <div className="col-1">
        <Dropdown className="mt-4">
          <Dropdown.Toggle className='user_img' variant="white">
            <FontAwesomeIcon icon={faUserCircle} size="4x" color="black" />
          </Dropdown.Toggle>
          {auth.user && <Dropdown.Menu className="text-center" align="end">
            <Dropdown.Item className="mt-3">내 프로필</Dropdown.Item>
            <Dropdown.Item onClick={logout} className="mt-3">로그아웃</Dropdown.Item>
          </Dropdown.Menu>}
          {!auth.user && <Dropdown.Menu className="text-center" align="end">
            <Dropdown.Item  className="mt-3" onClick={handleLogin}>로그인</Dropdown.Item>
            <Dropdown.Item  className="mt-3" onClick={handleSignup}>회원가입</Dropdown.Item>
          </Dropdown.Menu>}
        </Dropdown>  
      </div>
    </div>

  
    

  </nav>
  
  );
};

export default Header;