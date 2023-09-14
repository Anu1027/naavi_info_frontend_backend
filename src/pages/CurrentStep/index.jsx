import React from "react";
import "./currentstep.scss";

import dummy from "../JourneyPage/dummy.svg";

const CurrentStep = () => {
  return (
    <div className="currentstep">
      <div className="cs-top-area">
        <div>Your Current Step</div>
        <div className="bold-text">Complete The Visa Application</div>
      </div>
      <div className="cs-content">
        <div className="overall-cs-content">
          <div className="macro-view-box">
            <div className="macro-text">Macro View:</div>
            <div className="macro-content">
              <div>
                <img src={dummy} alt="" />
              </div>
              <div className="step-text">Step 1</div>
              <div className="macro-text-div">
                Products that perform seamlessly during any kind of surge, so
                you don’t have to worry about uptime.
              </div>
            </div>
          </div>
          <div className="micro-view-box">
            <div className="micro-text">Micro View:</div>
            <div className="micro-content">
              <div>
                <img src={dummy} alt="" />
              </div>
              <div className="step-text">Step 2</div>
              <div className="micro-text-div">
                Products that perform seamlessly during any kind of surge, so
                you don’t have to worry about uptime and reliability. don’t have
                to worry about uptime and reliability.
              </div>
            </div>
          </div>
          <div className="nano-view-box">
            <div className="nano-text">Nano View:</div>
            <div className="nano-content">
              <div>
                <img src={dummy} alt="" />
              </div>
              <div className="step-text">Step 3</div>
              <div className="nano-text-div">
                Products that perform seamlessly during any kind of surge, so
                you don’t have to worry about uptime and reliability. Products
                that perform seamlessly during any kind of surge, so you don’t
                have to worry about uptime and reliability.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cs-footer">
        <div className="completed-div">Are You Completed This Step:</div>
        <div className="yes-no">
          <p>Yes</p>
        </div>
        <div className="yes-no">
          <p>No</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentStep;
