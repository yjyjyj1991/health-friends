import React from "react";
import logo from './logo.png';
import './Header.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { Link,useNavigate } from 'react-router-dom';
import {AuthContext,} from '../account/AuthProvider'
import {useContext,useState} from 'react'

import FormDialog from '../common/FormDialog'

const Header = () => {
  const auth = useContext(AuthContext)
  const [dialog,setDialog]=useState(false)

  const navigate=useNavigate()
  function handleLogin(){
    setDialog('login')
  }
  function handleSignup(){
    setDialog('signup')
  }
  function logout(){
    navigate('/')
    auth.signout()
  }
  function changePw(){
    setDialog('changePw')
  }

  return (
  <>
  <nav className="navbar navbar-expand-lg sticky-top">
    <div className="container-fluid">
      {auth.user && <div className="container d-flex justify-content-between">
        <Link to='/'>
          <img src={logo} alt="logo" style={{height: '7rem'}}/>
        </Link>
        <Link to='/rooms'>
          <p className="room nav-link" style={{color:'black'} }>헬스장</p>
        </Link>
        <Link to='/diet'>
          <p className="room nav-link" style={{color:'black'} }>운동기록</p>
        </Link>
        <Link to='/diet'>
          <p className="room nav-link" style={{color:'black'} }>식단</p>
        </Link>
        <Link to='/boards'>
          <p className="room nav-link" style={{color:'black'} }>HELP DESK</p>
        </Link>
        <Dropdown className="mt-4">
          <Dropdown.Toggle className='user_img' variant="white">
            <FontAwesomeIcon icon={faUserCircle} size="4x" color="black" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="text-center" align="end">
            <Dropdown.Item onClick={changePw} className="mt-3">비밀번호변경</Dropdown.Item>
            <Dropdown.Item onClick={logout} className="mt-3">로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
      }
      {!auth.user && <div className="container d-flex justify-content-between">
        <Link to='/'>
          <img src={logo} alt="logo" style={{height: '7rem'}}/>
        </Link>
          <p className="room nav-link" style={{color:'black', visibility:'hidden'} }>헬스장</p>
          <p className="room nav-link" style={{color:'black', visibility:'hidden'} }>운동기록</p>
          <p className="room nav-link" style={{color:'black', visibility:'hidden'} }>식단</p>
        <Link to='/boards'>
          <p className="room nav-link" style={{color:'black'} }>HELP DESK</p>
        </Link>
        <Dropdown className="mt-4">
          <Dropdown.Toggle className='user_img' variant="white">
            <FontAwesomeIcon icon={faUserCircle} size="4x" color="black" />
          </Dropdown.Toggle>
        <Dropdown.Menu className="text-center" align="end">
            <Dropdown.Item  className="mt-3" onClick={handleLogin}>로그인</Dropdown.Item>
            <Dropdown.Item  className="mt-3" onClick={handleSignup}>회원가입</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
      }
    </div>
  </nav>
  <FormDialog setDialog={setDialog} dialog={dialog} />
  </>
  );
};

export default Header;
