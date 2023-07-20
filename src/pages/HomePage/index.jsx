import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.scss";

//images
import logo from "../../static/images/logo.svg";
import homepageImg from "../../static/images/homepageImg.png";
import discoverIcon from "../../static/images/homepage/discoverIcon.svg";
import refineIcon from "../../static/images/homepage/refineIcon.svg";
import mentorIcon from "../../static/images/homepage/mentorIcon.svg";
import analyzeIcon from "../../static/images/homepage/analyzeIcon.svg";
import adjustIcon from "../../static/images/homepage/adjustIcon.svg";
import accomplishIcon from "../../static/images/homepage/accomplishIcon.svg";

const HomePage = () => {
  const navigate = useNavigate();

  const hiwData = [
    {
      id: 1,
      name: "Discover",
      icon: discoverIcon,
    },
    {
      id: 2,
      name: "Refine",
      icon: refineIcon,
    },
    {
      id: 3,
      name: "Get Mentored",
      icon: mentorIcon,
    },
    {
      id: 4,
      name: "Analyze",
      icon: analyzeIcon,
    },
    {
      id: 5,
      name: "Adjust",
      icon: adjustIcon,
    },
    {
      id: 6,
      name: "Accomoplish",
      icon: accomplishIcon,
    },
  ];

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
          <div
            className="gs-Btn"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Get Started
          </div>
        </div>
      </div>
      <div className="color-box"></div>
      <div className="cover-Img">
        <img src={homepageImg} alt="" />
        <div className="background-tint"></div>
        <div className="mid-text">Find Your Next Adventure</div>
        <div className="background-tint1"></div>
        <div className="input-box-container">
          <div className="input-box1">
            <input type="text" placeholder="What Do You Want To Accomplish?" />
          </div>
          <div className="input-box2">
            <input type="text" placeholder="By When?" />
          </div>
          <div
            className="createPath-btn"
            onClick={() => {
              navigate("/maps");
            }}
          >
            Create Path
          </div>
        </div>
      </div>
      <div className="hiw-container">
        <div className="hiw-text">How It Works</div>
        <div className="hiw-options">
          {hiwData.map((e, i) => {
            return (
              <div className="each-hiw-option" key={e.id}>
                <div className="img-border">
                  <img src={e.icon} alt="" />
                </div>
                <div className="each-hiw-option-name">{e.name}</div>
              </div>
            );
          })}
          <div className="centre-line"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
