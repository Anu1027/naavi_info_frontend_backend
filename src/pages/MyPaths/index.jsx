import React, { useState, useEffect } from "react";
import { useCoinContextData } from "../../context/CoinContext";
import Skeleton from "react-loading-skeleton";
import "./mypaths.scss";

// images
import dummy from "./dummy.svg";
import axios from "axios";

const MyPaths = ({ search }) => {
  let userDetails = JSON.parse(localStorage.getItem("user"));
  const { mypathsMenu, setMypathsMenu } = useCoinContextData();
  const [partnerPathData, setPartnerPathData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [partnerStepsData, setPartnerStepsData] = useState([]);

  useEffect(() => {
    setLoading(true);
    let email = userDetails?.user?.email;
    axios
      .get(`https://careers.marketsverse.com/paths/get?email=${email}`)
      .then((response) => {
        let result = response?.data?.data;
        // console.log(result, "partnerPathData result");
        setPartnerPathData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error in partnerPathData");
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    let email = userDetails?.user?.email;
    axios
      .get(`https://careers.marketsverse.com/steps/get?email=${email}`)
      .then((response) => {
        let result = response?.data?.data;
        // console.log(result, "partnerStepsData result");
        setPartnerStepsData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error in partnerPathData");
      });
  }, []);

  const filteredPartnerPathData = partnerPathData?.filter((entry) =>
    entry?.nameOfPath?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const filteredPartnerStepsData = partnerStepsData?.filter((entry) =>
    entry?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  return (
    <div className="mypaths">
      <div className="mypaths-menu">
        <div
          className="each-mypath-menu"
          style={{
            fontWeight: mypathsMenu === "Paths" ? "700" : "",
            background:
              mypathsMenu === "Paths" ? "rgba(241, 241, 241, 0.5)" : "",
          }}
          onClick={() => {
            setMypathsMenu("Paths");
          }}
        >
          Paths
        </div>
        <div
          className="each-mypath-menu"
          style={{
            fontWeight: mypathsMenu === "Steps" ? "700" : "",
            background:
              mypathsMenu === "Steps" ? "rgba(241, 241, 241, 0.5)" : "",
          }}
          onClick={() => {
            setMypathsMenu("Steps");
          }}
        >
          Steps
        </div>
      </div>
      <div className="mypaths-content">
        {mypathsMenu === "Paths" ? (
          <>
            <div className="mypathsNav">
              <div className="mypaths-name-div">Name</div>
              <div className="mypaths-description-div">Description</div>
            </div>
            <div className="mypathsScroll-div">
              {loading
                ? Array(10)
                    .fill("")
                    .map((e, i) => {
                      return (
                        <div className="each-mypaths-data" key={i}>
                          <div className="each-mypaths-name">
                            <Skeleton width={100} height={30} />
                          </div>
                          <div className="each-mypaths-desc">
                            <Skeleton width={"100%"} height={30} />
                          </div>
                        </div>
                      );
                    })
                : filteredPartnerPathData?.map((e, i) => {
                    return (
                      <div className="each-mypaths-data" key={i}>
                        <div className="each-mypaths-name">{e?.nameOfPath}</div>
                        <div className="each-mypaths-desc">
                          {e?.description}
                        </div>
                      </div>
                    );
                  })}
            </div>
          </>
        ) : (
          <>
            <div className="mypathsNav">
              <div className="mypathsName">Name</div>
              <div className="mypathsCountry">Country</div>
              <div className="mypathsCountry">Type</div>
              <div className="mypathsCountry">Cost Structure</div>
              <div className="mypathsVendors">Vendors</div>
              <div className="mypathsVendors">Mentors</div>
              <div className="mypathsMicrosteps">Micro Steps</div>
            </div>
            <div className="mypathsScroll-div">
              {loading
                ? Array(10)
                    .fill("")
                    ?.map((e, i) => {
                      return (
                        <div className="each-mypaths-data1" key={i}>
                          <div className="each-mypaths-detail">
                            <div className="each-mypathsName">
                              <Skeleton width={100} height={30} />
                            </div>
                            <div className="each-mypathsCountry">
                              <Skeleton width={100} height={30} />
                            </div>
                            <div className="each-mypathsCountry">
                              <Skeleton width={100} height={30} />
                            </div>
                            <div className="each-mypathsCountry">
                              <Skeleton width={100} height={30} />
                            </div>
                            <div className="each-mypathsVendors">
                              <Skeleton width={100} height={30} />
                            </div>
                            <div className="each-mypathsVendors">
                              <Skeleton width={100} height={30} />
                            </div>
                            <div className="each-mypathsMicrosteps">
                              <Skeleton width={100} height={30} />
                            </div>
                          </div>
                          <div className="each-mypaths-desc">
                            <div className="each-mypaths-desc-txt">
                              <Skeleton width={100} height={30} />
                            </div>
                            <div className="each-mypaths-desc-txt1">
                              <Skeleton width={"100%"} height={30} />
                            </div>
                          </div>
                        </div>
                      );
                    })
                : filteredPartnerStepsData?.map((e, i) => {
                    return (
                      <div className="each-mypaths-data1" key={i}>
                        <div className="each-mypaths-detail">
                          <div className="each-mypathsName">
                            <div>
                              <img src={e?.icon} alt="" />
                            </div>
                            <div>
                              <div>{e?.name}</div>
                              <div
                                style={{
                                  fontSize: "0.8rem",
                                  fontWeight: "300",
                                }}
                              >
                                {e?._id}
                              </div>
                            </div>
                          </div>
                          <div className="each-mypathsCountry">
                            {e?.country}
                          </div>
                          <div className="each-mypathsCountry">{e?.type}</div>
                          <div className="each-mypathsCountry">{e?.cost}</div>
                          <div className="each-mypathsVendors">
                            {e?.vendors?.length}
                          </div>
                          <div className="each-mypathsVendors">
                            {e?.Mentors?.length}
                          </div>
                          <div className="each-mypathsMicrosteps">
                            {e?.microsteps?.length}
                          </div>
                        </div>
                        <div className="each-mypaths-desc">
                          <div className="each-mypaths-desc-txt">
                            Description
                          </div>
                          <div className="each-mypaths-desc-txt1">
                            There are certain transactions that happen in every
                            app regardless of the business. The revenue from
                            these transactions are captured by us and we want to
                            share it with you.{" "}
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPaths;
