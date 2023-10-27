import React, { useEffect, useState } from "react";
import { useStore } from "../../components/store/store.ts";
import "./journey.scss";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { useCoinContextData } from "../../context/CoinContext";

// images
import arrow from "./arrow.svg";

const JourneyPage = () => {
  const { selectedPathItem, setSelectedPathItem } = useCoinContextData();
  let userDetails = JSON.parse(localStorage.getItem("user"));
  const { sideNav, setsideNav } = useStore();
  const [loading, setLoading] = useState(false);
  const [journeyPageData, setJourneyPageData] = useState([]);
  const email = userDetails?.user?.email;

  useEffect(() => {
    setLoading(true);
    let selectedPathData = JSON.parse(localStorage.getItem("selectedPath"));
    if (selectedPathData) {
      // console.log(selectedPathData, "selected path name");
      axios
        .get(
          `https://careers.marketsverse.com/paths/get?nameOfPath=${selectedPathData}`
        )
        .then((response) => {
          let result = response?.data?.data[0];
          // console.log(result, "selectedPathData result");
          setSelectedPathItem(result);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error, "error in journey page");
        });
    } else {
      axios
        .get(`https://careers.marketsverse.com/userpaths/get?email=${email}`)
        .then((response) => {
          let result = response?.data?.data[0];
          // console.log(result, "journeyPageData result");
          setJourneyPageData(result);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error, "error in fetching journeyPageData");
        });
    }
  }, []);

  return (
    <div className="journeypage">
      <div className="journey-top-area">
        <div>Your Selected Path:</div>
        {loading ? (
          <Skeleton width={150} height={30} />
        ) : (
          <div className="bold-text">
            {selectedPathItem?.length > 0
              ? selectedPathItem?.destination_institution
              : journeyPageData?.PathDetails?.length > 0
              ? journeyPageData?.PathDetails?.[0]?.nameOfPath
              : ""}
          </div>
        )}
        {loading ? (
          <Skeleton width={500} height={20} />
        ) : (
          <div className="journey-des">
            {selectedPathItem?.length > 0
              ? selectedPathItem?.description
              : journeyPageData?.PathDetails?.length > 0
              ? journeyPageData?.PathDetails?.[0]?.description
              : ""}
          </div>
        )}
        <div
          className="goBack-div"
          onClick={() => {
            setsideNav("Paths");
            localStorage.removeItem("selectedPath");
            setSelectedPathItem([]);
          }}
          style={{ display: selectedPathItem?.length > 0 ? "flex" : "none" }}
        >
          Go Back
        </div>
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
          : selectedPathItem?.length > 0
          ? selectedPathItem?.StepDetails?.map((e, i) => {
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
            })
          : journeyPageData?.PathDetails?.length > 0
          ? journeyPageData?.PathDetails?.[0]?.StepDetails?.map((e, i) => {
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
            })
          : ""}
      </div>
    </div>
  );
};

export default JourneyPage;
