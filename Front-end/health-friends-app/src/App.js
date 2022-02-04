/*eslint-disable*/
import Main from "./components/Main/Main";
import Board from "./components/Board/Board";
import Login from "./components/account/Login";
import SignUp from "./components/account/SignUp";
import FoodMain from "./components/food/FoodMain";
import RoomMain from "./room/RoomMain";
import './App.css';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/rooms" element={<RoomMain />} />
      <Route path="/foods" element={<FoodMain />} />
      <Route path="/boards" element={<Board />} />
      <Route path="/users" element={<SignUp />} />
      <Route path="/users/login" element={<Login />} />
    </Routes>
  );
}

export default App;