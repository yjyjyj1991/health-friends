import React from 'react';
// import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Activity from "../food/Activity";
import './FoodMain.css'; 
// import axios from 'axios'

const Food = () => {
  return (
    <div className='container_food'>
      {/* <Header/> */}
      <div className='food_content'>
        <Activity/>
      </div>

      <Footer/>
    </div>
  );
};

export default Food;