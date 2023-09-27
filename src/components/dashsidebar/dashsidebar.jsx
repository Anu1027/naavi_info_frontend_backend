import React, { useState } from "react";
import realtorwhite from "../../static/images/dashboard/realtorwhite.svg";
import "./dashsidebar.scss";
import { useStore } from "../store/store.ts";
import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";

const sidebarMenu1 = [
  {
    id: 0,
    title: "Paths",
  },
  {
    id: 1,
    title: "Partners",
  },
  {
    id: 2,
    title: "Services",
  },
];

const sidebarMenu2 = [
  {
    id: 0,
    title: "My Journey",
  },
  {
    id: 1,
    title: "Current Step",
  },
  {
    id: 2,
    title: "Calendar",
  },
  {
    id: 3,
    title: "Cabinet",
  },
  {
    id: 4,
    title: "Task Manager",
  },
];

const sidebarMenu3 = [
  {
    id: 0,
    title: "Vaults",
  },
  {
    id: 1,
    title: "Naavi GPT",
  },
];

const Dashsidebar = ({ isNotOnMainPage }) => {
  const { sideNav, setsideNav, setBuy } = useStore();
  const navigate = useNavigate();
  return (
    <div className="dashboard-sidebar1" style={{ overflow: "hidden" }}>
      <div className="logo-border">
        <div className="dashboard-left">
          <img
            className="dashboard-logo"
            src={logo}
            alt=""
            style={{ width: "50%" }}
          />
        </div>
      </div>
      <div
        style={{
          overflowY: "scroll",
          height: "calc(100% - 70px)",
          padding: "30px 2vw 0px 2vw",
        }}
      >
        <div>
          <div
            style={{
              // marginLeft: "15px",
              fontWeight: "600",
              fontSize: "18px",
              marginBottom: "1.5rem",
              color: "#100F0D",
            }}
          >
            Discover
          </div>
          {sidebarMenu1.map((each, i) => {
            return (
              <div
                className="each-sidenav"
                style={{
                  background: sideNav === each.title ? "#FFFFFF" : "",
                  color: sideNav === each.title ? "#100F0D" : "",
                  paddingLeft: sideNav === each.title ? "20px" : "",
                  // boxShadow:
                  //   sideNav === each.title
                  //     ? "0px 2px 2px rgba(0, 0, 0, 0.25)"
                  //     : "",
                  // fontWeight: sideNav === each.title ? "700" : "500",
                  borderRadius: sideNav === each.title ? "35px" : "",
                }}
                key={i}
                onClick={() => {
                  setsideNav(each.title);
                  if (isNotOnMainPage) {
                    navigate("/dashboard/users/");
                    setBuy("step1");
                  }
                }}
              >
                {each.title}
              </div>
            );
          })}
        </div>
        <div className="sidebar-line"></div>
        <div
          style={{
            // marginLeft: "15px",
            fontWeight: "600",
            fontSize: "18px",
            marginBottom: "1.5rem",
            color: "#100F0D",
          }}
        >
          Manage
        </div>
        <div>
          {sidebarMenu2.map((ele, j) => {
            return (
              <div
                className="each-sidenav"
                style={{
                  background: sideNav === ele.title ? "#FFFFFF" : "",
                  color: sideNav === ele.title ? "#100F0D" : "",
                  paddingLeft: sideNav === ele.title ? "20px" : "",
                  // boxShadow:
                  //   sideNav === ele.title
                  //     ? "0px 2px 2px rgba(0, 0, 0, 0.25)"
                  //     : "",
                  borderRadius: sideNav === ele.title ? "35px" : "",
                }}
                key={j}
                onClick={() => setsideNav(ele.title)}
              >
                {ele.title}
              </div>
            );
          })}
        </div>
        <div className="sidebar-line"></div>
        <div
          style={{
            // marginLeft: "15px",
            fontWeight: "600",
            fontSize: "18px",
            marginBottom: "1.5rem",
            color: "#100F0D",
          }}
        >
          Tools
        </div>
        <div>
          {sidebarMenu3.map((ele, j) => {
            return (
              <div
                className="each-sidenav"
                style={{
                  background: sideNav === ele.title ? "#FFFFFF" : "",
                  color: sideNav === ele.title ? "#100F0D" : "",
                  paddingLeft: sideNav === ele.title ? "20px" : "",
                  // boxShadow:
                  //   sideNav === ele.title
                  //     ? "0px 2px 2px rgba(0, 0, 0, 0.25)"
                  //     : "",
                  borderRadius: sideNav === ele.title ? "35px" : "",
                }}
                key={j}
                onClick={() => setsideNav(ele.title)}
              >
                {ele.title}
              </div>
            );
          })}
        </div>
      </div>
      {/* <div
        className="side-btn"
        style={{
          background: "#59A2DD",
          borderRadius: "35px",
          padding: "15px 0px",
          color: "#FFF",
          width: "15vw",
          textAlign: "center",
          position: "fixed",
          bottom: "20px",
          cursor: "pointer",
        }}
      >
        Upgrade To Plus
      </div> */}
    </div>
  );
};

export default Dashsidebar;
