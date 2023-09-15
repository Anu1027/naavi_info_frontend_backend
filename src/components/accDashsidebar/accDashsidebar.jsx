import React, { useState } from "react";
import realtorwhite from "../../static/images/dashboard/realtorwhite.svg";
import "./accDashsidebar.scss";
import { useStore } from "../store/store.ts";
import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";

const sidebarMenu1 = [
  {
    id: 0,
    title: "CRM",
    click: true,
  },
  {
    id: 1,
    title: "My Services",
    click: true,
  },
  {
    id: 2,
    title: "Content",
    click: false,
  },
];

const sidebarMenu2 = [
  {
    id: 0,
    title: "Tasks",
    click: true,
  },
  {
    id: 1,
    title: "Calendar",
    click: true,
  },
  {
    id: 2,
    title: "Outsource",
    click: false,
  },
];

const sidebarMenu3 = [
  {
    id: 0,
    title: "Vaults",
    click: true,
  },
  {
    id: 1,
    title: "TaxGPT",
    click: false,
  },
];

const AccDashsidebar = ({ isNotOnMainPage }) => {
  const { accsideNav, setaccsideNav, setispopular } = useStore();
  const navigate = useNavigate();
  return (
    <div
      className="dashboard-sidebar"
      style={{ overflow: "hidden", padding: "0" }}
    >
      <div
        className="dashboard-left"
        style={{
          padding: "0 2vw",
          height: "70px",
          borderBottom: "0.5px solid #e5e5e5",
          display: "flex",
        }}
      >
        <img
          className="dashboard-logo"
          src={logo}
          alt=""
          style={{ width: "85%" }}
        />
      </div>
      <div
        style={{
          overflowY: "scroll",
          height: "75vh",
          marginTop: "30px",
          padding: "0 2vw",
        }}
      >
        <div
          style={{
            marginLeft: "15px",
            fontWeight: "600",
            fontSize: "18px",
            marginBottom: "1.5rem",
            color: "#100F0D",
          }}
        >
          Grow
        </div>
        <div>
          {sidebarMenu1.map((each, i) => {
            return (
              <div
                className="each-sidenav"
                style={{
                  background: accsideNav === each.title ? "#FFFFFF" : "",
                  color: accsideNav === each.title ? "#100F0D" : "",
                  // paddingLeft: accsideNav === each.title ? '20px' : '',
                  // boxShadow:
                  //   accsideNav === each.title
                  //     ? "0px 2px 2px rgba(0, 0, 0, 0.25)"
                  //     : "",
                  fontWeight: accsideNav === each.title ? "700" : "500",
                  borderRadius: accsideNav === each.title ? "35px" : "",
                  opacity: each.click ? "1" : "0.25",
                  cursor: each.click ? "pointer" : "not-allowed",
                }}
                key={i}
                onClick={() => {
                  if (each.click && isNotOnMainPage) {
                    navigate("/dashboard/accountants");
                  } else if (each.click) {
                    setaccsideNav(each.title);
                  }
                }}
              >
                {each.title}
              </div>
            );
          })}
        </div>
        {/* <div className="sidebar-line"></div> */}
        <div
          style={{
            marginLeft: "15px",
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
                  background: accsideNav === ele.title ? "#FFFFFF" : "",
                  color: accsideNav === ele.title ? "#100F0D" : "",
                  paddingLeft: accsideNav === ele.title ? "20px" : "",
                  // boxShadow:
                  //   accsideNav === ele.title
                  //     ? "0px 2px 2px rgba(0, 0, 0, 0.25)"
                  //     : "",
                  borderRadius: accsideNav === ele.title ? "35px" : "",
                  opacity: ele.click ? "1" : "0.25",
                  cursor: ele.click ? "pointer" : "not-allowed",
                  fontWeight: accsideNav === ele.title ? "700" : "500",
                }}
                key={j}
                onClick={() => {
                  if (ele.click && isNotOnMainPage) {
                    navigate("/dashboard/accountants");
                  } else if (ele.click) {
                    setaccsideNav(ele.title);
                  }
                }}
              >
                {ele.title}
              </div>
            );
          })}
        </div>
        {/* <div className="sidebar-line"></div> */}
        <div
          style={{
            marginLeft: "15px",
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
                  background: accsideNav === ele.title ? "#FFFFFF" : "",
                  color: accsideNav === ele.title ? "#100F0D" : "",
                  paddingLeft: accsideNav === ele.title ? "20px" : "",
                  // boxShadow:
                  //   accsideNav === ele.title
                  //     ? "0px 2px 2px rgba(0, 0, 0, 0.25)"
                  //     : "",
                  borderRadius: accsideNav === ele.title ? "35px" : "",
                  opacity: ele.click ? "1" : "0.25",
                  cursor: ele.click ? "pointer" : "not-allowed",
                  fontWeight: accsideNav === ele.title ? "700" : "500",
                }}
                key={j}
                onClick={() => {
                  if (ele.click && isNotOnMainPage) {
                    navigate("/dashboard/accountants");
                  } else if (ele.click) {
                    setaccsideNav(ele.title);
                  }
                }}
              >
                {ele.title}
              </div>
            );
          })}
        </div>
      </div>
      <div
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
          left: "2.5vw",
        }}
        onClick={() => setispopular(true)}
      >
        Add New
      </div>
    </div>
  );
};

export default AccDashsidebar;
