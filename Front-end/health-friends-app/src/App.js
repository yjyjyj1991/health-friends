/*eslint-disable*/
import Main from "./components/Main/Main";
import Board from "./components/Board/Board";
// import Login from "./components/account/Login";
// import SignUp from "./components/account/SignUp";
import RoomMain from "./room/RoomMain";
import { useState } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import {AuthProvider,RequireAuth} from "./components/account/AuthProvider";
import Header from './components/Header/Header';
import React from "react";
import Dialog from './components/account/Dialog'

// 접근제한 거는법: RequireAuth로 감싸주면 됩니다. rooms 보세요.
function App() {
  const [dialog, setDialog] = React.useState(false);

  return (
  <AuthProvider setDialog={setDialog}> 
    <Dialog dialog={dialog} setDialog={setDialog} form={dialog}/>
    <Header dialog={dialog} setDialog={setDialog}/>

    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/rooms" element={<RequireAuth setDialog={setDialog}><RoomMain /></RequireAuth>} />
      <Route path="/boards" element={<Board />} />

    </Routes>
  </AuthProvider>
  );
}

export default App;