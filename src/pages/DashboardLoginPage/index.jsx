import React from "react";
import "./login.scss";

import loginpic from "../../static/images/loginpic.svg";
import loginlogo from "../../static/images/loginlogo.svg";
import googlelogo from "../../static/images/googlelogo.svg";

const DashboardLoginPage = () => {
  return (
    <div className="loginPage-wrapper">
      <div className="loginPage-leftSide">
        <img src={loginlogo} alt="" className="login-logo" />
        <input type="text" className="login-input1" placeholder="Email" />
        <div className="login-input2">
          <input type="password" placeholder="Password" />
        </div>
        <div className="forgot-password-div">
          <div>Forgot Password</div>
        </div>
        <div className="login-Btn">Login</div>
        <div className="google-Btn">
          <img src={googlelogo} alt="" />
          <div>Continue With Google</div>
        </div>
        <div className="register-div">
            <p>Click Here To Register With Email</p>
        </div>
      </div>

      <div className="loginPage-rightSide">
        <div className="img-div"></div>
      </div>
    </div>
  );
};

export default DashboardLoginPage;
