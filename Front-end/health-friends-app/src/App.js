import Main from "./components/Main/Main";
import Board from "./components/Board/Board";
import RoomMain from "./components/room/RoomMain";
// import './App.css';
import { Routes, Route } from "react-router-dom";
import {AuthContext,RequireAuth} from "./components/account/Auth";
// import Header from './components/Header/Header';
// import AppBar from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import React,{ useState, lazy, Suspense,Fragment} from "react";

const BASE_URL='https://i6d204.p.ssafy.io/api/'

const Record = lazy(() => import("./apps/record/Record"));
const Diet = lazy(() => import('./apps/diet/Diet'));


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
    <Suspense fallback={<Fragment />}>  
      <Routes>
        <Route path="/" element={<Main setDialog={setDialog}/>} />
        <Route path="/rooms" element={<RoomMain />}/>
        <Route path="/boards" element={<Board />} />
        <Route path="/record" element={<RequireAuth setDialog={setDialog}><Record /></RequireAuth>} />
        <Route path="/diet" element={<RequireAuth setDialog={setDialog}><Diet/></RequireAuth>} />
      </Routes>    
    </Suspense>
    {/* <Footer/> */}
  </AuthContext.Provider>
  );
}

export default App;