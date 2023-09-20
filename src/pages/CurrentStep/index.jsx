import React, { useState } from "react";
import "./currentstep.scss";

import dummy from "../JourneyPage/dummy.svg";

const CurrentStep = () => {

  const [showNewDiv, setShowNewDiv] = useState(null);

  const handleRejectClick = () => {
    setShowNewDiv(false);

    setTimeout(() => {
      setShowNewDiv(true);
    }, 200);
  };

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
              <div className="macro-image-div">
                <img src={dummy} alt="" />
              </div>
              <div className="step-text">Choose the right <br /> curriculum</div>
              <div className="macro-text-div">
                Choosing the right curriculum is an important decision, whether
                it's for yourself, your child, or a group of students. The
                choice of curriculum depends on several factors, including your
                educational goals, learning objectives, student needs, and
                teaching philosophy. Here are some steps to help you choose the
                right curriculum:
              </div>
            </div>
          </div>
          <div className="micro-view-box">
            <div className="micro-text">Micro View:</div>
            <div className="micro-content">
              <div className="micro-image-div">
                <img src={dummy} alt="" />
              </div>
              <div className="step-text">
                Choose The Right Curriculum <br /> For You
              </div>
              <div className="micro-text-div-container">
                <div className="micro-text-div">
                  <div className="bold-text">Current Stream: MPC</div>
                  <div className="sub-text">
                    Related Profile Consideration 1
                  </div>
                </div>
                <div className="micro-text-div">
                  <div className="bold-text">Current Stream: MPC</div>
                  <div className="sub-text">
                    Related Profile Consideration 1
                  </div>
                </div>
                <div className="based-text">
                  Based on the 2 profile considerations, the correct curriculum
                  for you is <span>Cambridge</span>
                </div>
              </div>
            </div>
          </div>
          <div className="nano-view-box">
            <div className="nano-text">Nano View:</div>
            <div className="nano-content">
              <div className="nano-image-div">
                <img src={dummy} alt="" />
              </div>
              <div className="step-text">
                Get A Naavi Certified Vendor To Assist You In Choosing The Right
                Curriculum
              </div>
              <div className="nano-overall-div">
                <div className="nano-div1"></div>
                <div
                  className={`nano-div2 ${
                    showNewDiv === true
                      ? "slide-in"
                      : showNewDiv === false
                      ? "fade-out"
                      : ""
                  }`}
                >
                  <div className="accept-btn">Accept Offer</div>
                  <div
                    className="reject-btn"
                    onClick={() => {
                      handleRejectClick();
                    }}
                  >
                    Reject Offer
                  </div>
                </div>
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
