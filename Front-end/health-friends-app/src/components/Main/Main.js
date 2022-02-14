import React from "react";
import './Main.css';
import { Link } from 'react-router-dom';
import {AuthContext,} from '../account/Auth'
import { useContext, useState} from 'react'
import AppBar from '../appbar/AppBar';
import Footer from '../Footer/Footer';
import { Container } from '@mui/material';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// import Button from 'react-bootstrap/Button'

const Main = (props) => {
  // const {setDialog}=props       // 이거 지워도 되는 부분?? 밑에거랑 비교
  const [dialog, setDialog] = useState(null)
  const auth = useContext(AuthContext)
  function handleLogin(){
    setDialog('login')
  }
  return (
    <div style={{display: 'flex', flexDirection:'column', minHeight:'100%'}}>
      <AppBar dialog={dialog} setDialog={setDialog} />
      <div style={{flex:'1'}}>
        <Container maxWidth="xl" style={{ mb:'2rem', display:'flex', flexDirection:'column', alignItems:'center', justifyItems:'center'}} >
          <div style={{height:'75vh', minHeight: 600, maxHeight:650}}>
            <Box align="center" marked="center" sx={{ mb:'10rem', mt:{xs:'4rem', sm: '17rem'}}}>
                <Typography variant="h1"style={{color: 'inherit',fontSize:'9rem',  fontWeight:'bold', marginBottom:'4rem'}}>HEALTH, WORK OUT,</Typography>
                <Typography variant="h1"style={{color: '#99A799',fontSize:'9rem',  fontWeight:'bold'}}><span style={{color:'black'}}>WITH&nbsp;</span>HEALTH FRIENDS</Typography>
            </Box>
            {auth.user && 
            <div className="d-flex justify-content-center">
              <Button href="/rooms" style={{backgroundColor:'#D3E4CD', border:'0ch', borderRadius:'34px', height: '5rem', width:'23rem', fontSize:'large', color:'black', fontWeight:'bold' }}>운동하러 가기</Button>
              </div>
                }
            {!auth.user && 
              <div style={{textDecoration:'none', display:'flex', justifyContent:'center'}}>
                <button align="end" style={{color:'black', marginBottom:'0', marginTop:'0'}} onClick={handleLogin} className="start_btn">운동하러 가기</button>
              </div>}
          </div>
          </Container>
          {/* <Box style={{backgroundColor:'#D3E4CD', height:'10rem', marginTop:'12rem'}}> </Box> */}
          <Box sx={{backgroundColor:'#D3E4CD', height:{xs:'2rem',sm:'15rem'}, marginTop:'12rem'}}> </Box>
        <Container maxWidth="xl" style={{ mb:'3rem', mt:'17rem'}} >
            <section id="service" className="service">
              <div className="container">
                  <div className="row">
                      <div className="main_service_area sections"> 
                          <div className="col-sm-6">
                              <div className="signle_service_left" >
                                <Typography variant="h1" style={{ fontSize:'14rem', fontWeight:'bold', color:'#e1e1e1'}}>
                                  What <br/> We <br/> Do <br/>
                                </Typography>
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
        </Container>
        {/* {/* </Container> */}
        {/* <div class="d-grid gap-2 col-2 mx-auto"> */}
        {/* <div style={{backgroundColor:'#D3E4CD', height:'15rem'}} >
        </div> */}
      </div>
      

      <Footer/>
    </div>
  );
};
export default Main;