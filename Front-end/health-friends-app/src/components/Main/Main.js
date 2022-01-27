import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Main.css'; 
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button'

const Main = () => {
  return (
    <div>
      <Header/>
      <div className="container_main">
        <div className="first_main">
          <div className="main_sentence d-flex justify-content-center">
            <p>HEALTH, WORK OUT,<br/>WITH&nbsp;
              <span style={{color: '#99A799'}}>HEALTH FRIENDS</span></p>

          </div>
          <div className="d-flex justify-content-center">
              {/* <button href="#health" className="btn btn-lg">시작하기</button>
              <Button size="lg" className="start_btn" style={{ 
                backgroundColor: '#D3E4CD', 
                color:'black',
                textDecoration: 'none',  }} href="#login">운동가기</Button> */}
              {/* <Link to="#..."><button color="black" className="start_btn">운동하러 가기</button></Link> */}
              <button color="black" className="start_btn">운동하러 가기</button>
              
          </div>
        </div>
        {/* <div class="d-grid gap-2 col-2 mx-auto"> */}
        <div style={{backgroundColor:'#D3E4CD', height:'15rem'}} >

        </div>
        {/* <div className="second_main">
          <div className="second_sentence col-6">
            <p>WHAT<br/>WE<br/>DO<br/></p>
          </div> */}
          {/* <div className="col-6">
            <div>
              <p>함께하는 홈트</p>
              <p>여럿이서 함께 할수 있는... 어쩌구 저쩌꾸..</p>
            </div>
          </div> */}
          <section id="service" className="service">
            <div className="container">
                <div className="row">
                    <div className="main_service_area sections d-flex align-items-center"> 
                        <div className="col-sm-6">
                            <div className="signle_service_left">
                                <h2>What
                                    We 
                                    Do</h2>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="single_service_right">
                                <div className="single_service">
                                    <div className="single_service_icon">
                                        <i className="lnr lnr-laptop-phone"></i>
                                    </div>
                                    <div className="single_service_content">
                                        <h3>Web Design</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </p>
                                    </div>
                                </div>
                                <div className="single_service">
                                    <div className="single_service_icon">
                                        <i className="lnr lnr-screen"></i>
                                    </div>
                                    <div className="single_service_content">
                                        <h3>UI/UX Design</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </p>
                                    </div>
                                </div>
                                <div className="single_service">
                                    <div className="single_service_icon">
                                        <i className="lnr lnr-picture"></i>
                                    </div>
                                    <div className="single_service_content">
                                        <h3>Photography</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </p>
                                    </div>
                                </div>
                                <div className="single_service">
                                    <div className="single_service_icon">
                                        <i className="lnr lnr-laptop-phone"></i>
                                    </div>
                                    <div className="single_service_content">
                                        <h3>App Development</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* </div> */}
        <div>
        </div>

      </div>
      <Footer/>
    </div>
  );
};
export default Main;