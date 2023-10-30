import React, { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import "./pathview.scss";
import { GlobalContex } from "../../globalContext";
import { useCoinContextData } from "../../context/CoinContext";

const Pathview = () => {
  const [loading, setLoading] = useState(false);
  const [preLoginPathViewData, setPreLoginPathViewData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://careers.marketsverse.com/paths/get`)
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

  return (
    <div className="pathviewPage1">
      <div className="pathviewNav1">
        <div className="name-div1">Name</div>
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
              <div className="each-pv-data1" key={i}>
                <div className="each-pv-name1">{e?.nameOfPath}</div>
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
