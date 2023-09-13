import React from "react";
import "./journey.scss";

import dummy from "./dummy.svg";
import arrow from "./arrow.svg";

const JourneyPage = () => {
  return (
    <div className="journeypage">
      <div className="journey-top-area">
        <div>Your Selected Path:</div>
        <div className="bold-text">
          Destination: Cornell | Law School | 2026
        </div>
      </div>
      <div className="journey-steps-area">
        <div className="each-j-step relative-div">
          <div className="each-j-img">
            <img src={dummy} alt="" />
          </div>
          <div className="each-j-step-text">Step 1</div>
          <div className="each-j-step-text1">
            Products that perform seamlessly during any kind of surge, so you
            don’t have to worry about uptime and reliability.
          </div>
          <div className="each-j-amount-div">
            <div className="each-j-amount">600 INR</div>
            <div
              className="each-j-amount"
              style={{ textDecorationLine: "underline" }}
            >
              Current
            </div>
          </div>
          <div className="j-arr-div">
            <img src={arrow} alt="" />
          </div>
        </div>

        <div className="each-j-step relative-div">
          <div className="each-j-img">
            <img src={dummy} alt="" />
          </div>
          <div className="each-j-step-text">Step 2</div>
          <div className="each-j-step-text1">
            Products that perform seamlessly during any kind of surge, so you
            don’t have to worry about uptime and reliability.
          </div>
          <div className="each-j-amount-div">
            <div className="each-j-amount">600 INR</div>
          </div>
          <div className="j-arr-div">
            <img src={arrow} alt="" />
          </div>
        </div>

        <div className="each-j-step">
          <div className="each-j-img">
            <img src={dummy} alt="" />
          </div>
          <div className="each-j-step-text">Step 3</div>
          <div className="each-j-step-text1">
            Products that perform seamlessly during any kind of surge, so you
            don’t have to worry about uptime and reliability.
          </div>
          <div className="each-j-amount-div">
            <div className="each-j-amount">600 INR</div>
          </div>
        </div>

        <div className="each-j-step relative-div">
          <div className="each-j-img">
            <img src={dummy} alt="" />
          </div>
          <div className="each-j-step-text">Step 4</div>
          <div className="each-j-step-text1">
            Products that perform seamlessly during any kind of surge, so you
            don’t have to worry about uptime and reliability.
          </div>
          <div className="each-j-amount-div">
            <div className="each-j-amount">600 INR</div>
          </div>
          <div className="j-arr-div">
            <img src={arrow} alt="" />
          </div>
        </div>

        <div className="each-j-step relative-div">
          <div className="each-j-img">
            <img src={dummy} alt="" />
          </div>
          <div className="each-j-step-text">Step 5</div>
          <div className="each-j-step-text1">
            Products that perform seamlessly during any kind of surge, so you
            don’t have to worry about uptime and reliability.
          </div>
          <div className="each-j-amount-div">
            <div className="each-j-amount">600 INR</div>
          </div>
          <div className="j-arr-div">
            <img src={arrow} alt="" />
          </div>
        </div>

        <div className="each-j-step">
          <div className="each-j-img">
            <img src={dummy} alt="" />
          </div>
          <div className="each-j-step-text">Step 6</div>
          <div className="each-j-step-text1">
            Products that perform seamlessly during any kind of surge, so you
            don’t have to worry about uptime and reliability.
          </div>
          <div className="each-j-amount-div">
            <div className="each-j-amount">600 INR</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyPage;
