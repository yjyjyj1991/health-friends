import React from "react";
import logo from './logo.png';
// import logo from './public/logo.png';
import './Footer.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="container">
          <div className="main_footer">
              <div className="row">
                  <div className="col-sm-6 col-xs-12">
                      <div className="copyright_text">
                      <img src={logo} alt="logo" style={{height: '7rem', margin: '2rem'}} />
                      </div>
                  </div>

                  <div className="col-sm-6 col-xs-12">
                  <div className="copyright_text">
                  <p className=" wow fadeInRight" data-wow-duration="1s">Made with <i className="fa fa-heart"></i> by <a href="http://bootstrapthemes.co">Bootstrap Themes</a>2016. All Rights Reserved</p>
                      </div>

                  </div>
              </div>
          </div>
      </div>
  </footer>
  )
};

export default Footer;