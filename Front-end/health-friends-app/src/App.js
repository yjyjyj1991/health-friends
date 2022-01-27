/*eslint-disable*/
import Main from "./components/Main/Main";
import Board from "./components/Board/Board";
import RoomMain from "./room/RoomMain";
import './App.css';
// import { Route, Switch } from 'react-router-dom';
// import { render } from "react-dom";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/rooms" element={<RoomMain/ >} />
      <Route path="/boards" element={<Board />} />

    </Routes>

    // <div>
    //   <Switch>  
    //     <Route exact path='/'>
    //       <Main/>
    //     </Route>
    //     <Route path='/rooms'>
    //       <RoomMain/>
    //     </Route>
    //     <Route path='/boards'>
    //       <Board/>
    //     </Route>
    //   </Switch>
    // </div>
  
  );
}

export default App;