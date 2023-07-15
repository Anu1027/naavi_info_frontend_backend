import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.scss";
import logo from "../../static/images/logo.svg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="menu-items">
          <div>
            <p>Paths</p>
          </div>
          <div>
            <p>Explore</p>
          </div>
          <div>
            <p>Products</p>
          </div>
          <div>
            <p>Resources</p>
          </div>
          <div>
            <p>Vendors</p>
          </div>
          <div className="btns-div">
            <div
              className="business-btn"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Business
            </div>
            <div className="gs-Btn">Get Started</div>
          </div>
        </div>
      </div>
      <div className="color-box"></div>
    </div>
  );
};

export default HomePage;
