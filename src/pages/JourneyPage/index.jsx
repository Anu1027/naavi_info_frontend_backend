import React, { useEffect, useState } from "react";
import { useStore } from "../../components/store/store.ts";
import "./journey.scss";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

// images
import dummy from "./dummy.svg";
import arrow from "./arrow.svg";

const JourneyPage = () => {
  let userDetails = JSON.parse(localStorage.getItem("user"));
  const { sideNav, setsideNav } = useStore();
  const [journeyData, setJourneyData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let email = userDetails?.user?.email;
    axios
      .get(`https://careers.marketsverse.com/userpaths/get?email=${email}`)
      .then((response) => {
        let result = response?.data?.data;
        // console.log(result, "journey data");
        setJourneyData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error in journey data");
      });
  }, []);

  return (
    <div className="journeypage">
      <div className="journey-top-area">
        <div>Your Selected Path:</div>
        {loading ? (
          <Skeleton width={150} height={30} />
        ) : (
          <div className="bold-text">
            {journeyData[0]?.PathDetails[0]?.destination_institution}
          </div>
        )}
        {loading ? (
          <Skeleton width={500} height={20} />
        ) : (
          <div className="journey-des">
            {journeyData[0]?.PathDetails[0]?.description}
          </div>
        )}
      </div>
      <div className="journey-steps-area">
        {loading
          ? Array(6)
              .fill("")
              .map((e, i) => {
                return (
                  <div className="each-j-step relative-div" key={i}>
                    <div className="each-j-img">
                      <Skeleton width={75} height={75} />
                    </div>
                    <div className="each-j-step-text">
                      <Skeleton width={200} height={30} />
                    </div>
                    <div className="each-j-step-text1">
                      <Skeleton width={250} height={25} />
                    </div>
                    <div className="each-j-amount-div">
                      <div className="each-j-amount">
                        <Skeleton width={100} height={30} />
                      </div>
                    </div>
                  </div>
                );
              })
          : journeyData[0]?.PathDetails[0]?.StepDetails?.map((e, i) => {
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
      </div>
    </div>
  );
};

export default JourneyPage;
