import React, { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { useCoinContextData } from "../../context/CoinContext";
import "./pathview.scss";
import { GlobalContex } from "../../globalContext";

const Pathview = () => {
  const {
    searchTerm,
    pathItemSelected,
    setPathItemSelected,
    pathItemStep,
    setPathItemStep,
    selectedPathItem,
    setSelectedPathItem,
  } = useCoinContextData();
  const {
    refetchPaths,
    gradeToggle,
    schoolToggle,
    setSchoolToggle,
    curriculumToggle,
    setCurriculumToggle,
    streamToggle,
    setStreamToggle,
    performanceToggle,
    setPerformanceToggle,
    financialToggle,
    setFinancialToggle,
  } = useContext(GlobalContex);
  const [loading, setLoading] = useState(false);
  const [pathViewData, setPathViewData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://careers.marketsverse.com/paths/get/specific`, {
        params: {
          email: JSON.parse(localStorage.getItem("user"))?.user?.email,
          grade: gradeToggle,
          curriculum: curriculumToggle,
          stream: streamToggle,
          performance: performanceToggle,
          financialSituation: financialToggle,
        },
      })
      .then((response) => {
        let result = response?.data?.data;
        // console.log(result, "path view result");
        setPathViewData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error in getting path view result");
        setPathViewData([]);
        setLoading(false);
      });
  }, [refetchPaths]);

  const filteredPathViewData = pathViewData?.filter((entry) =>
    entry?.nameOfPath?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="pathviewPage">
      <div className="pathviewNav">
        <div className="name-div">Name</div>
        <div className="description-div">Description</div>
      </div>
      <div className="pathviewContent">
        {loading ? (
          Array(10)
            .fill("")
            .map((e, i) => {
              return (
                <div className="each-pv-data" key={i}>
                  <div className="each-pv-name">
                    <Skeleton width={100} height={30} />
                  </div>
                  <div className="each-pv-desc">
                    <Skeleton width={100} height={30} />
                  </div>
                </div>
              );
            })
        ) : filteredPathViewData.length > 1 ? (
          filteredPathViewData?.map((e, i) => {
            return (
              <div
                className="each-pv-data"
                key={i}
                onClick={() => {
                  setPathItemSelected(true);
                  setSelectedPathItem(e);
                  localStorage.setItem("selectedPath", JSON.stringify(e));
                  // console.log(e?._id, 'selected path');
                }}
              >
                <div className="each-pv-name">{e?.nameOfPath}</div>
                <div className="each-pv-desc">{e?.description}</div>
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
