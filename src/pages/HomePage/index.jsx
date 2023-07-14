import React from "react";
import "./homepage.scss";
import logo from "../../static/images/logo.svg";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="menu-items">
          <div>Paths</div>
          <div>Explore</div>
          <div>Products</div>
          <div>Resources</div>
          <div>Vendors</div>
          <div className="gs-Btn">Get Started</div>
        </div>
      </div>
      <div className="color-box"></div>
    </div>
  );
};

export default HomePage;
