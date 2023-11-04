import React, { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import "./pathview.scss";
import { GlobalContex } from "../../globalContext";
import { useCoinContextData } from "../../context/CoinContext";

const Pathview = ({
  switchToStep,
  setSwitchToStep,
  switchStepsDetails,
  setSwitchStepsDetails,
}) => {
  const [loading, setLoading] = useState(false);
  const [preLoginPathViewData, setPreLoginPathViewData] = useState([]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`https://careers.marketsverse.com/paths/get`)
      .then((response) => {
        let result = response?.data?.data;
        // console.log(result, "path view result");
        setPreLoginPathViewData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error in getting pre-login path view result");
        setPreLoginPathViewData([]);
        setLoading(false);
      });
  }, []);

  const getStepsForSelectedPath = (selectedPath) => {
    setIsloading(true);
    axios
      .get(
        `https://careers.marketsverse.com/paths/get?nameOfPath=${selectedPath}`
      )
      .then((response) => {
        let result = response?.data?.data[0];
        // console.log(result, "selectedPathData result");
        setSwitchStepsDetails(result);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error, "error in getStepsForSelectedPath");
      });
  };

  return (
    <div className="pathviewPage1">
      {switchToStep ? (
        <div className="pathviewPage1-step-details">
          <div className="pathviewPage1-journey-top-area">
            <div>Your Selected Path:</div>
            {isloading ? (
              <Skeleton width={150} height={30} />
            ) : (
              <div className="pathviewPage1-bold-text">
                {switchStepsDetails?.length > 0
                  ? switchStepsDetails?.destination_institution
                  : ""}
              </div>
            )}
            {isloading ? (
              <Skeleton width={500} height={20} />
            ) : (
              <div className="pathviewPage1-journey-des">
                {switchStepsDetails?.length > 0
                  ? switchStepsDetails?.description
                  : ""}
              </div>
            )}
            <div
              className="pathviewPage1-goBack-div"
              onClick={() => {
                setSwitchToStep(false);
                setSwitchStepsDetails([]);
              }}
            >
              Go Back
            </div>
          </div>
          <div className="pathviewPage1-journey-steps-area">
            {isloading
              ? Array(6)
                  .fill("")
                  .map((e, i) => {
                    return (
                      <div
                        className="pathviewPage1-each-j-step pathviewPage1-relative-div"
                        key={i}
                      >
                        <div className="pathviewPage1-each-j-img">
                          <Skeleton width={75} height={75} />
                        </div>
                        <div className="pathviewPage1-each-j-step-text">
                          <Skeleton width={200} height={30} />
                        </div>
                        <div className="pathviewPage1-each-j-step-text1">
                          <Skeleton width={250} height={25} />
                        </div>
                        <div className="pathviewPage1-each-j-amount-div">
                          <div className="pathviewPage1-each-j-amount">
                            <Skeleton width={100} height={30} />
                          </div>
                        </div>
                      </div>
                    );
                  })
              : switchStepsDetails?.length > 0
              ? switchStepsDetails?.StepDetails?.map((e, i) => {
                  return (
                    <div
                      className="pathviewPage1-each-j-step pathviewPage1-relative-div"
                      key={i}
                    >
                      <div className="pathviewPage1-each-j-img">
                        <img src={e?.icon} alt="" />
                      </div>
                      <div className="pathviewPage1-each-j-step-text">
                        {e?.name}
                      </div>
                      <div className="pathviewPage1-each-j-step-text1">
                        {e?.description}
                      </div>
                      <div className="pathviewPage1-each-j-amount-div">
                        <div className="pathviewPage1-each-j-amount">
                          {e?.cost}
                        </div>
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
      ) : (
        <>
          <div className="pathviewNav1">
            <div className="name-div1">School</div>
            <div className="name-div1">Program</div>
            <div className="description-div1">Description</div>
          </div>
          <div className="pathviewContent1">
            {loading ? (
              Array(10)
                .fill("")
                .map((e, i) => {
                  return (
                    <div className="each-pv-data1" key={i}>
                      <div className="each-pv-name1">
                        <Skeleton width={100} height={30} />
                      </div>
                      <div className="each-pv-desc1">
                        <Skeleton width={100} height={30} />
                      </div>
                    </div>
                  );
                })
            ) : preLoginPathViewData?.length > 0 ? (
              preLoginPathViewData?.map((e, i) => {
                return (
                  <div
                    className="each-pv-data1"
                    key={i}
                    onClick={() => {
                      getStepsForSelectedPath(e?.nameOfPath);
                      setSwitchToStep(true);
                    }}
                  >
                    <div className="each-pv-name1">{e?.destination_institution}</div>
                    <div className="each-pv-name1">{e?.program}</div>
                    <div className="each-pv-desc1">{e?.description}</div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "20vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Path Found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Pathview;
