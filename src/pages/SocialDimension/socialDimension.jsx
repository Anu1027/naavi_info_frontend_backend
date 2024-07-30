import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCoinContextData } from "../../context/CoinContext";
import "./socialDimension.scss";
import { AnimatedOnScroll } from "react-animated-css-onscroll";

import logo from "../../static/images/logo.svg";
import hamIcon from "../../static/images/icons/hamIcon.svg";
import SD from "../../static/images/SD.png";
import chart from "../../static/images/chart.png";

const SocialDimension = () => {
  const navigate = useNavigate();
  const { preLoginMenu, setPreLoginMenu } = useCoinContextData();

  return (
    <div className='SocialDimensionPage'>
      <div className="navbar">
        <div className="hamMenu-home">
          <img src={hamIcon} alt="ham menu" />
        </div>
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="logo" />
        </div>
        <div className="menu-items">
          <div
            onClick={() => {
              navigate("/");
              setPreLoginMenu("About Us");
            }}
          >
            <p style={{ fontWeight: preLoginMenu === "About Us" ? "600" : "" }}>
              About Naavi
            </p>
          </div>
          
          <div
            onClick={() => {
              setPreLoginMenu("SocialDimension");
            }}
          >
            <p style={{ fontWeight: preLoginMenu === "SocialDimension" ? "600" : "" }}>
              Social Dimension
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/AIMethdology");
              setPreLoginMenu("AIMethdology");
            }}
          >
            <p style={{ fontWeight: preLoginMenu === "AIMethdology" ? "600" : "" }}>
            AI Methdology
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/contact");
              setPreLoginMenu("ContactUs");
            }}
          >
            <p style={{ fontWeight: preLoginMenu === "ContactUs" ? "600" : "" }}>
              Contact
            </p>
          </div>
          <div
          onClick={() => {
            navigate("/WhitePaper");
            setPreLoginMenu("WhitePaper");
          }}
        >
          <p style={{ fontWeight: preLoginMenu === "WhitePaper" ? "600" : "" }}>
            White Paper
          </p>
        </div>
        </div>
      </div>
      <div className="color-box"></div>
      <div className="socialDimension container py-5">
        <div className="row">
          <div className="col-md-6">
            <img className="chart-image" src={chart} alt="Chart" />
          </div>
          <div className="col-md-6">
            <div className="content">
              <h3>Social Inequality in Higher Education</h3>
              <h5 className='py-3 w-100'>
                <span>Social Dimension:</span> Following the Bologna process, German higher education has seen increased social stratification,
                disproportionately affecting students from disadvantaged and migrant backgrounds
              </h5>
              <h5 className='py-3'>
                <span>Dropout Risks:</span> Immigrant and working-class students face lower grades and a higher dropout risk, leading to increased chances of academic failure
              </h5>
            </div>
          </div>
        </div>
        <div className="row my-5">
          <h2>Decision Delusion Problem</h2>
          <div className="col-md-6 my-4">
            <AnimatedOnScroll animationIn="bounceInLeft" duration="1000" style={{ animationDelay: '500ms', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
              <p>Due to the lack of Personalised education pathways students often choose generic study option</p>
              <p>Many students, who do not fit standard educational prospects, fall through the cracks</p>
              <p>This situation leads to disengagement, low motivation and mismatched careers</p>
            </AnimatedOnScroll>
          </div>
          <div className="col-md-6">
            <AnimatedOnScroll animationIn="bounceInRight" duration="1000" style={{ animationDelay: '500ms' }}>
              <img className="w-100 h-100" src={SD} alt="SD" />
            </AnimatedOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialDimension;
