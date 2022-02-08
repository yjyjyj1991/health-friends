/*eslint-disable*/
import Main from "./components/Main/Main";
import BoardCreate from "./components/Board/BoardCreate";
import FoodMain from "./components/food/FoodMain";
import RoomMain from "./components/room/RoomMain";
// import './App.css';
import { Routes, Route } from "react-router-dom";
import {AuthProvider,RequireAuth} from "./components/account/AuthProvider";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import React from "react";
import Dialog from './components/common/Dialog'
import Diet from './apps/diet/Diet'

// 접근제한 거는법: RequireAuth로 감싸주면 됩니다. rooms 보세요.
function App() {
  console.log('app render');
  return (
  <AuthProvider> 
    <Header/>

    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="/rooms" element={<RequireAuth dialog={dialog} setDialog={setDialog}><RoomMain /></RequireAuth>} /> */}
      <Route path="/rooms" element={<RoomMain />}/>
      <Route path="/boards" element={<BoardCreate />} />
      <Route path="/foods" element={<FoodMain />} />
      <Route path="/diet" element={<Diet/>} />
    </Routes>
    <Footer/>
  </AuthProvider>
  );
}

export default App;