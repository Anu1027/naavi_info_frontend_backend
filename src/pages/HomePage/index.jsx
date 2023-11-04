import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.scss";
import { useCoinContextData } from "../../context/CoinContext";

//images
import logo from "../../static/images/logo.svg";
import homepageImg from "../../static/images/homepageImg.png";
import discoverIcon from "../../static/images/homepage/discoverIcon.svg";
import refineIcon from "../../static/images/homepage/refineIcon.svg";
import mentorIcon from "../../static/images/homepage/mentorIcon.svg";
import analyzeIcon from "../../static/images/homepage/analyzeIcon.svg";
import adjustIcon from "../../static/images/homepage/adjustIcon.svg";
import accomplishIcon from "../../static/images/homepage/accomplishIcon.svg";
import heroImg from "../../static/images/homepage/heroImg.png";
import hamIcon from "../../static/images/icons/hamIcon.svg";

const HomePage = () => {
  const navigate = useNavigate();
  const { preLoginMenu, setPreLoginMenu } = useCoinContextData();

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
        <div className="hamMenu-home">
          <img src={hamIcon} alt="" />
        </div>
        <div className="logo">
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
              About Us
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/maps");
              setPreLoginMenu("Paths");
            }}
          >
            <p style={{ fontWeight: preLoginMenu === "Paths" ? "600" : "" }}>
              Paths
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/directory/nodes");
              setPreLoginMenu("Partners");
            }}
          >
            <p style={{ fontWeight: preLoginMenu === "Partners" ? "600" : "" }}>
              Partners
            </p>
          </div>
        </div>
        <div className="btns-div">
          <div
            className="gs-Btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Get Started
          </div>
        </div>
      </div>
      <div className="color-box"></div>
      <div className="homepage-content">
        <div className="cover-Img">
          <img src={homepageImg} alt="" />
          <div className="background-tint"></div>
          <div className="mid-text">Find Your Next Adventure</div>
          <div className="background-tint1"></div>
          <div className="input-box-container">
            <div className="input-box1">
              <input
                type="text"
                placeholder="What Do You Want To Accomplish?"
              />
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
        <div className="cover-Img-mobile">
          <img src={heroImg} alt="" />
          <div className="background-tint-mobile"></div>
          <div className="mid-text-mobile">Find Your Next Adventure</div>
          <div className="background-tint1-mobile"></div>
          <div className="input-box-container-mobile">
            <div className="input-box1-mobile">
              <input type="text" placeholder="What Do You Want?" />
              <div
                className="createPath-btn-mobile"
                onClick={() => {
                  navigate("/maps");
                }}
              >
                Go
              </div>
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
    </div>
  );
};

export default HomePage;
