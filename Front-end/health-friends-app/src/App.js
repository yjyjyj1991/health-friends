import Main from "./components/Main/Main";
import Board from "./components/Board/Board";
import FoodMain from "./components/food/FoodMain";
import RoomMain from "./components/room/RoomMain";
// import './App.css';
import { Routes, Route } from "react-router-dom";
import {AuthContext,RequireAuth} from "./components/account/Auth";
// import Header from './components/Header/Header';
// import AppBar from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import React from "react";
import Diet from './apps/diet/Diet'
import { useState } from "react";

const BASE_URL='https://i6d204.p.ssafy.io/api/'

// 접근제한 거는법: RequireAuth로 감싸주면 됩니다. rooms 봐주세요.
function App() {
  // console.log('app render');
  const [user,setUser]=useState(localStorage.getItem('user'))
  const [dialog, setDialog] = useState(null)
  function login(user){
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  }
  function logout(){
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
  <AuthContext.Provider value={{user:user,login:login,logout:logout}}> 
    {/* <Header dialog={dialog} setDialog={setDialog} /> */}
    {/* <AppBar dialog={dialog} setDialog={setDialog} /> */}

    <Routes>
      <Route path="/" element={<Main setDialog={setDialog}/>} />
      {/* <Route path="/rooms" element={<RequireAuth dialog={dialog} setDialog={setDialog}><RoomMain /></RequireAuth>} /> */}
      <Route path="/rooms" element={<RoomMain />}/>
      <Route path="/boards" element={<Board />} />
      <Route path="/foods" element={<FoodMain />} />
      <Route path="/diet" element={<RequireAuth setDialog={setDialog}><Diet/></RequireAuth>} />
    </Routes>
    {/* <Footer/> */}
  </AuthContext.Provider>
  );
}

export default App;