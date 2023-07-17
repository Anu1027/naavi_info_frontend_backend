import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mapspage.scss";

//images
import logo from "../../static/images/logo.svg";
import careerIcon from "../../static/images/mapspage/careerIcon.svg";
import educationIcon from "../../static/images/mapspage/educationIcon.svg";
import immigrationIcon from "../../static/images/mapspage/immigrationIcon.svg";
import plus from "../../static/images/mapspage/plus.svg";

const MapsPage = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState("Career");

  return (
    <div className="mapspage">
      <div className="maps-navbar">
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
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
      <div className="maps-color-box"></div>
      <div className="maps-container">
        <div className="maps-sidebar">
          <div className="top-icons">
            <div
              className="each-icon"
              onClick={() => {
                setOption("Career");
              }}
            >
              <div
                className="border-div"
                style={{
                  border:
                    option === "Career"
                      ? "1px solid #100F0D"
                      : "1px solid #e7e7e7",
                }}
              >
                <img src={careerIcon} alt="" />
              </div>
              <div
                className="icon-name-txt"
                style={{
                  fontWeight: option === "Career" ? "500" : "",
                }}
              >
                Career
              </div>
            </div>
            <div
              className="each-icon"
              onClick={() => {
                setOption("Education");
              }}
            >
              <div
                className="border-div"
                style={{
                  border:
                    option === "Education"
                      ? "1px solid #100F0D"
                      : "1px solid #e7e7e7",
                }}
              >
                <img src={educationIcon} alt="" />
              </div>
              <div
                className="icon-name-txt"
                style={{
                  fontWeight: option === "Education" ? "500" : "",
                }}
              >
                Education
              </div>
            </div>
            <div
              className="each-icon"
              onClick={() => {
                setOption("Immigration");
              }}
            >
              <div
                className="border-div"
                style={{
                  border:
                    option === "Immigration"
                      ? "1px solid #100F0D"
                      : "1px solid #e7e7e7",
                }}
              >
                <img src={immigrationIcon} alt="" />
              </div>
              <div
                className="icon-name-txt"
                style={{
                  fontWeight: option === "Immigration" ? "500" : "",
                }}
              >
                Immigration
              </div>
            </div>
          </div>
          <div className="mid-area">
            <div className="input-div1">
              <input type="text" placeholder="Choose Starting Coordinates.." />
            </div>
            <div className="destination-container">
              <div className="dest-txt">Destination 1</div>
              <div className="input-div2">
                <input type="text" placeholder="Where Do You Want To Go?" />
              </div>
              <div className="input-div2">
                <input type="text" placeholder="By When?" />
              </div>
            </div>
            <div className="add-div">
              <img src={plus} alt="" />
              Add Destination
            </div>
            <div className="maps-btns-div">
              <div className="gs-Btn-maps">Get Started</div>
              <div className="reset-btn">Reset</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsPage;
