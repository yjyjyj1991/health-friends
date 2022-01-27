import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';


// import { Route, BrowserRouter, Routes } from 'react-router-dom';
// import SignUp from './routes/account/SignUp'
// import WithMaterialUI from './routes/account/Both'
// // import FilterableProductTable from './routes/practice.jsx'
// // import Buttons from './routes/practice1.jsx'
// import SignupForm from './routes/account/Formik.jsx'
// import Login from './routes/account/Login.jsx'


ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='signup' element={<SignUp />}/>
        <Route path='login' element={<Login />}/>
        </Routes>
      </BrowserRouter>   */}
    
    <BrowserRouter>
      <App />
    </BrowserRouter>
      
  
  </React.StrictMode>,
  document.getElementById('root')
);
