/*eslint-disable*/
import Main from "./components/Main/Main";
import Board from "./components/Board/Board";
import FoodMain from "./components/food/FoodMain";
import RoomMain from "./room/RoomMain";
import './App.css';
import { Routes, Route } from "react-router-dom";
import {AuthProvider,RequireAuth} from "./components/account/AuthProvider";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import React from "react";
import Dialog from './components/account/Dialog'
// import { RoomCrudContextProvider } from '../src/room/RoomCrudContext';

// 접근제한 거는법: RequireAuth로 감싸주면 됩니다. rooms 보세요.
function App() {
  const [dialog, setDialog] = React.useState(false);

  return (
  <AuthProvider setDialog={setDialog}> 
    <Dialog dialog={dialog} setDialog={setDialog} form={dialog}/>
    <Header dialog={dialog} setDialog={setDialog}/>
    {/* <RoomCrudContextProvider> */}
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="/rooms" element={<RequireAuth setDialog={setDialog}><RoomMain /></RequireAuth>} /> */}
      <Route path="/rooms" element={<RoomMain />} />
      <Route path="/boards" element={<Board />} />
      <Route path="/foods" element={<FoodMain />} />
    </Routes>
    {/* </RoomCrudContextProvider> */}
    <Footer dialog={dialog} setDialog={setDialog}/>
  </AuthProvider>
  );
}

export default App;