import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SignUp from './routes/account/SignUp'
import WithMaterialUI from './routes/account/Both'
import FilterableProductTable from './routes/practice.jsx'
import Buttons from './routes/practice1.jsx'
import SignupForm from './routes/account/Formik.jsx'
import Login from './routes/account/Login.jsx'

const PRODUCTS=[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='signup' element={<SignUp />}/>
        <Route path='formik' element={<SignupForm />}/>
        <Route path='both' element={<WithMaterialUI />}/>
        <Route path='mock' element={<FilterableProductTable products={PRODUCTS} />}/>
        <Route path='mock1' element={<Buttons />}/>
        <Route path='login' element={<Login />}/>
      </Routes>
    </BrowserRouter>  
  </React.StrictMode>,
  document.getElementById('root')
);
