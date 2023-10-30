import React, { useState } from "react";
import "./currentstep.scss";
import { useCoinContextData } from "../../context/CoinContext";
import { useStore } from "../../components/store/store.ts";

import dummy from "../JourneyPage/dummy.svg";
import edutech from "./edutech.svg";
import resory from "./resory.svg";
import lek from "./lek.svg";

const CurrentStep = () => {
  const { currentStepData, setCurrentStepData } = useCoinContextData();
  const { sideNav, setsideNav } = useStore();
  const [showNewDiv, setShowNewDiv] = useState(null);
  const [position1, setPosition1] = useState(1);
  const [position2, setPosition2] = useState(2);
  const [position3, setPosition3] = useState(3);

  const handleRejectClick = () => {
    if (position1 === 1) {
      setPosition1(3);
    } else if (position1 === 2) {
      setPosition1(1);
    } else {
      setPosition1(2);
    }

    if (position2 === 2) {
      setPosition2(1);
    } else if (position2 === 3) {
      setPosition2(2);
    } else {
      setPosition2(3);
    }

    if (position3 === 3) {
      setPosition3(2);
    } else if (position3 === 2) {
      setPosition3(1);
    } else {
      setPosition3(3);
    }
  };

  return (
    <div className="currentstep">
      <div className="cs-top-area">
        <div className="cs-text1">
          <div>Your Current Step</div>
          <div
            className="back-Btn"
            onClick={() => {
              setCurrentStepData([]);
              setsideNav("My Journey");
            }}
          >
            Back To Path
          </div>
        </div>
        <div className="bold-text">
          <div>{currentStepData?.name}</div>
          <div>Apx Takes {currentStepData?.length} Days</div>
        </div>
      </div>
      <div className="cs-content">
        <div className="overall-cs-content">
          <div className="macro-view-box">
            <div className="macro-text">Macro View:</div>
            <div className="macro-content">
              {/* <div className="macro-image-div">
                <img src={dummy} alt="" />
              </div> */}
              <div className="step-text">{currentStepData?.name}</div>
              <div className="macro-text-div">
                {currentStepData?.description}
              </div>
            </div>
          </div>
          <div className="micro-view-box">
            <div className="micro-text">Micro View:</div>
            <div className="micro-content">
              {/* <div className="micro-image-div">
                <img src={dummy} alt="" />
              </div> */}
              <div className="step-text">
                <span style={{ fontStyle: "italic" }}>
                  {currentStepData?.name}
                </span>{" "}
                For You
              </div>
              <div className="micro-text-div-container">
                <div className="micro-text-div">
                  <div className="bold-text">Based On You’re Grade</div>
                  <div className="sub-text">
                    <div className="overflow-text">You should consider choosing enginee</div>
                    <div className="unlock-Btn">Unlock</div>
                  </div>
                </div>
                <div className="micro-text-div">
                  <div className="bold-text">Based On You’re Stream</div>
                  <div className="sub-text">
                    <div className="overflow-text">You should consider choosing enginee</div>
                    <div className="unlock-Btn">Unlock</div>
                  </div>
                </div>
                <div className="micro-text-div">
                  <div className="bold-text">Based On You’re Curriculum</div>
                  <div className="sub-text">
                    <div className="overflow-text">You should consider choosing enginee</div>
                    <div className="unlock-Btn">Unlock</div>
                  </div>
                </div>
                <div className="micro-text-div">
                  <div className="bold-text">
                    Based On You’re Grade Point Avg
                  </div>
                  <div className="sub-text">
                    <div className="overflow-text">You should consider choosing enginee</div>
                    <div className="unlock-Btn">Unlock</div>
                  </div>
                </div>
                {/* <div className="based-text">
                  Based on the 2 profile considerations, the correct curriculum
                  for you is <span>Cambridge</span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="nano-view-box">
            <div className="nano-text">Nano View:</div>
            <div className="nano-content">
              {/* <div className="nano-image-div">
                <img src={dummy} alt="" />
              </div> */}
              <div className="step-text">
                Get A Naavi Certified Vendor To Assist You{" "}
                <span style={{ fontStyle: "italic" }}>
                  {currentStepData?.name}
                </span>
              </div>
              <div className="nano-overall-div">
                {/* <div
                  className={`nano-div2 ${
                    showNewDiv === true
                      ? "slide-in"
                      : showNewDiv === false
                      ? "fade-out"
                      : ""
                  }`}
                >
                  <div className="nano-img">
                    <img src={edutech} alt="" />
                  </div>
                  <div className="nano-price">
                    <div className="disount-price">₹155</div>
                    <div className="original-price">₹205</div>
                  </div>
                  <div className="nano-speed-container">
                    <div className="speed-div">
                      <span>Speed: </span>
                      <span>14 Days</span>
                    </div>
                    <div className="speed-div">
                      <span>Success Rate:</span>
                      <span>525/622</span>
                    </div>
                  </div>
                  <div className="nano-btns">
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
                </div> */}
                <Carousel1
                  showNewDiv={showNewDiv}
                  handleRejectClick={handleRejectClick}
                  position1={position1}
                  // position2={position2}
                  // position3={position3}
                  image={resory}
                  originalprice={"250"}
                  discountprice={"999"}
                />

                <Carousel2
                  showNewDiv={showNewDiv}
                  handleRejectClick={handleRejectClick}
                  // position1={position1}
                  position2={position2}
                  // position3={position3}
                  image={edutech}
                  originalprice={"250"}
                  discountprice={"155"}
                />

                <Carousel3
                  showNewDiv={showNewDiv}
                  handleRejectClick={handleRejectClick}
                  // position1={position1}
                  // position2={position2}
                  position3={position3}
                  image={lek}
                  originalprice={"250"}
                  discountprice={"273"}
                />
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

const Carousel1 = ({
  showNewDiv,
  handleRejectClick,
  position1,
  // position2,
  // position3,
  image,
  originalprice,
  discountprice,
}) => {
  return (
    <div
      className={`nano-div2 ${
        showNewDiv === true
          ? "slide-in"
          : showNewDiv === false
          ? "fade-out"
          : ""
      }`}
      style={{
        left: position1 === 1 ? "0" : position1 === 2 ? "25%" : "50%",
        zIndex: position1 === 2 ? "3" : "2",
        height: position1 === 2 ? "100%" : "75%",
      }}
    >
      <div className="nano-img">
        <img src={image} alt="" />
      </div>
      <div className="nano-price">
        <div className="disount-price">₹{discountprice}</div>
        <div className="original-price">₹{originalprice}</div>
      </div>
      <div className="nano-speed-container">
        <div className="speed-div">
          <span>Speed: </span>
          <span>14 Days</span>
        </div>
        <div className="speed-div">
          <span>Success Rate:</span>
          <span>525/622</span>
        </div>
      </div>
      <div className="nano-btns">
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
  );
};

const Carousel2 = ({
  showNewDiv,
  handleRejectClick,
  // position1,
  position2,
  // position3,
  image,
  originalprice,
  discountprice,
}) => {
  return (
    <div
      className={`nano-div2 ${
        showNewDiv === true
          ? "slide-in"
          : showNewDiv === false
          ? "fade-out"
          : ""
      }`}
      style={{
        left: position2 === 1 ? "0" : position2 === 2 ? "25%" : "50%",
        zIndex: position2 === 2 ? "3" : "2",
        height: position2 === 2 ? "100%" : "75%",
      }}
    >
      <div className="nano-img">
        <img src={image} alt="" />
      </div>
      <div className="nano-price">
        <div className="disount-price">₹{discountprice}</div>
        <div className="original-price">₹{originalprice}</div>
      </div>
      <div className="nano-speed-container">
        <div className="speed-div">
          <span>Speed: </span>
          <span>14 Days</span>
        </div>
        <div className="speed-div">
          <span>Success Rate:</span>
          <span>525/622</span>
        </div>
      </div>
      <div className="nano-btns">
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
  );
};

const Carousel3 = ({
  showNewDiv,
  handleRejectClick,
  // position1,
  // position2,
  position3,
  image,
  originalprice,
  discountprice,
}) => {
  return (
    <div
      className={`nano-div2 ${
        showNewDiv === true
          ? "slide-in"
          : showNewDiv === false
          ? "fade-out"
          : ""
      }`}
      style={{
        left:
          // position1 === 1
          //   ? "0"
          //   : position1 === 2
          //   ? "25%"
          //   : position1 === 3
          //   ? "50%"
          //   : position2 === 1
          //   ? "0"
          //   : position2 === 2
          //   ? "25%"
          //   : position2 === 3
          //   ? "50%"
          //   :
          position3 === 1 ? "0" : position3 === 2 ? "25%" : "50%",
        zIndex: position3 === 2 ? "3" : "2",
        height: position3 === 2 ? "100%" : "75%",
      }}
    >
      <div className="nano-img">
        <img src={image} alt="" />
      </div>
      <div className="nano-price">
        <div className="disount-price">₹{discountprice}</div>
        <div className="original-price">₹{originalprice}</div>
      </div>
      <div className="nano-speed-container">
        <div className="speed-div">
          <span>Speed: </span>
          <span>14 Days</span>
        </div>
        <div className="speed-div">
          <span>Success Rate:</span>
          <span>525/622</span>
        </div>
      </div>
      <div className="nano-btns">
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
  );
};
