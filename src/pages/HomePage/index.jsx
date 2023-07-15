import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.scss";

import logo from "../../static/images/logo.svg";
import homepageImg from "../../static/images/homepageImg.svg";

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
        </div>
        <div className="btns-div">
          {/* <div
            className="business-btn"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Business
          </div> */}
          <div className="gs-Btn">Get Started</div>
        </div>
      </div>
      <div className="color-box"></div>
      <div className="cover-Img">
        <img src={homepageImg} alt="" />
        <div className="background-tint"></div>
        <div className="mid-text">Find Your Next Adventure</div>
        <div className="background-tint1"></div>
        <div className="input-box1">
          <input type="text" placeholder="What Do You Want To Accomplish?" />
        </div>
        <div className="input-box2">
          <input type="text" placeholder="By When?" />
        </div>
        <div className="createPath-btn">Create Path</div>
      </div>
    </div>
  );
};

export default HomePage;
