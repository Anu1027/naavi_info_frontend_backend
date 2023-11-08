import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loginpage.scss";
import lg1 from "../../static/images/login/lg1.svg";
import lg2 from "../../static/images/login/lg2.svg";
import google from "../../static/images/login/google.svg";
import realtorfull from "../../static/images/login/realtorfull.svg";
import eye1 from "../../static/images/login/eye1.svg";
import eye2 from "../../static/images/login/eye2.svg";
import { Loginservice, RegisterOnApp } from "../../services/loginapis";
import { useStore } from "../../components/store/store.ts";
import logo from "./logo.svg";
import loadinglogo from "./loadinglogo.svg";

const IconMenu = [
  {
    id: 0,
    icon: lg1,
  },
  {
    id: 1,
    icon: lg2,
  },
];

const Loginpage = () => {
  let navigate = useNavigate();
  const { accsideNav, setaccsideNav, loginType, setLoginType } = useStore();
  const [icon, setIcon] = useState(0);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [eye, seteye] = useState(false);
  const [iserror, setiserror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    let obj = {
      email: email,
      password: password,
    };
    Loginservice(obj).then((response) => {
      let result = response.data;
      if (result.status) {
        let obj = {
          email,
          app_code: "naavi",
          fromAppCreation: true,
        };
        RegisterOnApp(obj).then((response) => {
          let result = response?.data;
          // if (result?.status) {
          //   console.log(result?.status, "registered on TaxChains");
          // }
        });
        let obj1 = {
          email,
          app_code: "ice",
          fromAppCreation: true,
        };
        RegisterOnApp(obj1).then((response) => {
          let result = response?.data;
          // if (result?.status) {
          //   console.log(result?.status, "registered on ice");
          // }
        });
        localStorage.setItem("user", JSON.stringify(result));
        setiserror(false);
        setIsLoading(false);
        if (loginType === "Users") {
          navigate("/dashboard/users");
        } else {
          navigate("/dashboard/accountants/profile");
        }
      } else {
        setiserror(true);
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="login-main">
      <div className="login-box">
        <div className="full-logo-box">
          <img
            className="full-logo"
            src={logo}
            alt=""
            style={{ width: "50%" }}
          />
        </div>
        <div className="toggle-box">
          <div
            className="toggle-each"
            style={{
              background: loginType === "Users" ? "#F1F4F6" : "",
              fontWeight: loginType === "Users" ? "600" : "",
              fontSize: loginType === "Users" ? "18px" : "",
            }}
            onClick={() => setLoginType("Users")}
          >
            Users
          </div>
          <div
            className="toggle-each"
            style={{
              background: loginType === "Accountants" ? "#F1F4F6" : "",
              fontWeight: loginType === "Accountants" ? "600" : "",
              fontSize: loginType === "Accountants" ? "18px" : "",
            }}
            onClick={() => setLoginType("Accountants")}
          >
            Partners
          </div>
        </div>
        <div className="input-box">
          <input
            className="input-inp"
            type="text"
            placeholder="Email"
            required
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onInput={(e) => {
              setiserror(false);
              setemail(e.target.value);
            }}
          />
        </div>
        <div className="input-box">
          <input
            className="input-inp"
            type="password"
            placeholder="Password"
            id="password"
            autoComplete="new-password"
            name="password"
            required
            value={password}
            onInput={(e) => {
              setiserror(false);
              setpassword(e.target.value);
            }}
          />
        </div>
        <div className="forgot">Forgot Password</div>
        <div className="login-btn" onClick={() => handleLogin()}>
          Login
        </div>
        <div
          className="google-btn"
          onClick={() => {
            navigate("/register");
          }}
        >
          <div>Register With Email</div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="otclogo">
            <img className="otclogoimg" src={loadinglogo} alt="" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Loginpage;

{
  /* <div className="login-main">
<div className="login-icons">
  {IconMenu.map((each, i) => {
    return (
      <div className="icons-box" key={i}>
        <img
          className="icon"
          style={{ opacity: icon === each.id ? 1 : 0.25 }}
          src={each.icon}
          alt=""
        />
      </div>
    );
  })}
</div>
<div className="login-signin">
  <div className="loginForm" style={{ opacity: isLoading ? 0.25 : 1 }}>
    <div>
      <img className="indianOTClogo" src={realtorfull} alt="" />
      <div
        style={{
          display: iserror ? 'block' : 'none',
          fontSize: '15px',
          color: '#5f6163',
          marginTop: '25px',
        }}
      >
        You Have Entered Incorrect Login <br />
        Credentials. Please Try Again
      </div>
      <div
        className="group"
        id="email"
        key="email"
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      >
        <input
          id="email"
          autoComplete="email"
          type="text"
          name="email"
          required
          value={email}
          onInput={(e) => {
            setiserror(false);
            setemail(e.target.value);
          }}
        />
        <label id="email">Email</label>
      </div>
      <div
        className="group1"
        id="password"
        key="password"
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      >
        <input
          id="password"
          autoComplete="new-password"
          type={eye === false ? 'password' : 'text'}
          name="password"
          required
          value={password}
          onInput={(e) => {
            setiserror(false);
            setpassword(e.target.value);
          }}
        />
        <div className="eye">
          <img
            src={eye === false ? eye1 : eye2}
            alt=""
            onClick={() => seteye(!eye)}
          />
        </div>
        <label id="password">Password</label>
      </div>
      <button
        className="loginbtn"
        style={{ background: '#1F304F' }}
        onClick={() => handleLogin()}
      >
        <span>Login</span>
      </button>
      <div className="forgot">
        Forgot Password? <span className="forgot-btn">Click Here</span>
      </div>
    </div>
  </div>
  <div>
    {isLoading ? (
      <div className="otclogo">
        <img className="otclogoimg" src={lg1} alt="" />
      </div>
    ) : (
      ''
    )}
  </div>
</div>
<div className="login-register">
  <div className="reg-card">
    <h1 className="reg-head">Don’t Have A Accountants Account?</h1>
    <div className="reg-btn">Click Here</div>
  </div>
</div>
</div> */
}
