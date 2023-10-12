import React, { useEffect, useState } from "react";
import { useStore } from "../../components/store/store.ts";
import "./journey.scss";

import dummy from "./dummy.svg";
import arrow from "./arrow.svg";
import axios from "axios";

const JourneyPage = () => {
  let userDetails = JSON.parse(localStorage.getItem("user"));
  const { sideNav, setsideNav } = useStore();
  const [journeyData, setJourneyData] = useState([]);
  const [] = useState(false);

  useEffect(() => {
    let email = userDetails?.user?.email;
    axios
      .get(`https://careers.marketsverse.com/userpaths/get?email=${email}`)
      .then((response) => {
        let result = response?.data?.data;
        // console.log(result, "journey data");
        setJourneyData(result);
      })
      .catch((error) => {
        console.log(error, "error in journey data");
      });
  }, []);

  return (
    <div className="journeypage">
      <div className="journey-top-area">
        <div>Your Selected Path:</div>
        <div className="bold-text">
          {journeyData[0]?.PathDetails[0]?.destination_institution}
        </div>
        <div className="journey-des">
          {journeyData[0]?.PathDetails[0]?.description}
        </div>
      </div>
      <div className="journey-steps-area">
        {journeyData[0]?.PathDetails[0]?.StepDetails?.map((e, i) => {
          return (
            <div
              className="each-j-step relative-div"
              onClick={() => {
                setsideNav("Current Step");
              }}
              key={i}
            >
              <div className="each-j-img">
                <img src={e?.icon} alt="" />
              </div>
              <div className="each-j-step-text">{e?.name}</div>
              <div className="each-j-step-text1">{e?.description}</div>
              <div className="each-j-amount-div">
                <div className="each-j-amount">{e?.cost}</div>
                {/* <div
                  className="each-j-amount"
                  style={{ textDecorationLine: "underline" }}
                >
                  Current
                </div> */}
              </div>
              {/* <div className="j-arr-div">
                <img src={arrow} alt="" />
              </div> */}
            </div>
          );
        })}

        {/* <div
          className="each-j-step relative-div"
          onClick={() => {
            setsideNav("Current Step");
          }}
        >
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

        <div
          className="each-j-step relative-div"
          onClick={() => {
            setsideNav("Current Step");
          }}
        >
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

        <div
          className="each-j-step"
          onClick={() => {
            setsideNav("Current Step");
          }}
        >
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

        <div
          className="each-j-step relative-div"
          onClick={() => {
            setsideNav("Current Step");
          }}
        >
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

        <div
          className="each-j-step relative-div"
          onClick={() => {
            setsideNav("Current Step");
          }}
        >
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

        <div
          className="each-j-step"
          onClick={() => {
            setsideNav("Current Step");
          }}
        >
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
        </div> */}
      </div>
    </div>
  );
};

export default JourneyPage;
