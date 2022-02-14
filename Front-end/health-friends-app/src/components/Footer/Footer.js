import React from "react";
import logo from './logo.png';
// import logo from './public/logo.png';
import './Footer.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <Container maxWidth="lg" sx={{backgroundColor:'#D3E4CD'}}>
          <div className="main_footer">
              <div className="row">
                  <div className="col-sm-6 col-xs-12">
                      <div className="copyright_text">
                      <img src={logo} alt="logo" style={{height: '7rem', margin: '2rem'}} />
                      </div>
                  </div>

                  <div className="col-sm-6 col-xs-12">
                  <div className="copyright_text">
                  <p className=" wow fadeInRight" data-wow-duration="1s">Made with <i className="fa fa-heart"></i> by <a href="https://detailed-hockey-fc8.notion.site/a269a55c26cf43e4a77486e867721de4">헬프</a>2022. All Rights Reserved</p>
                      </div>

                  </div>
              </div>
          </div>
      </Container>
  </footer>
  )
};

export default Footer;