import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { useCoinContextData } from "../../context/CoinContext";
import "./pathview.scss";

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
  const [loading, setLoading] = useState(false);
  const [pathViewData, setPathViewData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://careers.marketsverse.com/paths/get")
      .then((response) => {
        let result = response?.data?.data;
        // console.log(result, "path view result");
        setPathViewData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error in getting path view result");
      });
  }, []);

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
        {loading
          ? Array(10)
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
          : filteredPathViewData?.map((e, i) => {
              return (
                <div
                  className="each-pv-data"
                  key={i}
                  onClick={() => {
                    setPathItemSelected(true);
                    setSelectedPathItem(e);
                    // console.log(e?._id, 'selected path');
                  }}
                >
                  <div className="each-pv-name">{e?.nameOfPath}</div>
                  <div className="each-pv-desc">{e?.description}</div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Pathview;
