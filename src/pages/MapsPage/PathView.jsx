import React, { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import "./pathview.scss";
import { GlobalContex } from "../../globalContext";
import { useCoinContextData } from "../../context/CoinContext";
import { useNavigate } from "react-router-dom";

const Pathview = ({
  switchToStep,
  setSwitchToStep,
  switchStepsDetails,
  setSwitchStepsDetails,
  loading1,
  setLoading1,
}) => {
  const {
    schoolSearch,
    setSchoolSearch,
    programSearch,
    setProgramSearch,
    showDdown,
    setShowDdown,
    preLoginPathViewData,
  } = useCoinContextData();

  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

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
      <div className="pathviewContent1">
        {loading1 ? (
          Array(10)
            .fill("")
            .map((e, i) => {
              return (
                <div className="each-pv-data1" key={i}>
                  <div className="each-pv-name1-div">
                    <div className="each-pv-name1">
                      <Skeleton width={100} height={30} />
                    </div>
                    <div className="each-pv-name1">
                      <Skeleton width={100} height={30} />
                    </div>
                  </div>
                  <div className="each-pv-desc1">
                    <Skeleton width={100} height={30} />
                  </div>
                </div>
              );
            })
        ) : preLoginPathViewData?.length > 0 ? (
          preLoginPathViewData
            ?.filter((item) => {
              if (schoolSearch) {
                return item?.destination_institution
                  ?.toLowerCase()
                  .includes(schoolSearch?.toLowerCase());
              } else if (programSearch) {
                return item?.program
                  ?.toLowerCase()
                  .includes(programSearch?.toLowerCase());
              } else {
                return "nil";
              }
            })
            .map((e, i) => {
              return (
                <div
                  className="each-pv-data1"
                  key={i}
                  onClick={() => {
                    getStepsForSelectedPath(e?.nameOfPath);
                    setSwitchToStep(true);
                  }}
                >
                  <div className="each-pv-name1-div">
                    <div className="each-pv-name1">
                      {e?.destination_institution}
                    </div>
                    <div className="each-pv-name1">{e?.program}</div>
                  </div>
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
    </div>
  );
};

export default Pathview;
