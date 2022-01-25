/*eslint-disable*/
import Main from "./components/Main/Main";
import './App.css';
import { Route, Switch } from 'react-router-dom';
import RoomMain from "./room/RoomMain";

function App() {
  return (
    <div>
      {/* <Header/> */}
      <Switch>  

        <Route exact path='/'>
          <Main/>
        </Route>

        <Route path='/rooms'>
          <RoomMain/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;