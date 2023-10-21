import React, { useState, useEffect } from "react";
import { useCoinContextData } from "../../context/CoinContext";
import "./mypaths.scss";

// images
import dummy from "./dummy.svg";

const MyPaths = () => {
  const { mypathsMenu, setMypathsMenu } = useCoinContextData();

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
              {/* {loading
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
                      localStorage.setItem("selectedPath", JSON.stringify(e));
                      // console.log(e?._id, 'selected path');
                    }}
                  >
                    <div className="each-pv-name">{e?.nameOfPath}</div>
                    <div className="each-pv-desc">{e?.description}</div>
                  </div>
                );
              })} */}
              <div className="each-mypaths-data">
                <div className="each-mypaths-name">Harvard University</div>
                <div className="each-mypaths-desc">
                  Cornell is considered the "easiest" Ivy League to get into
                  because it has the highest Ivy League acceptance rate. While
                  it's easier, statistically speaking, to get into Cornell, it's
                  still challenging. It's also important to remember that
                  students apply directly to one of Cornell's eight
                  undergraduate colleges.
                </div>
              </div>
              <div className="each-mypaths-data">
                <div className="each-mypaths-name">Harvard University</div>
                <div className="each-mypaths-desc">
                  Cornell is considered the "easiest" Ivy League to get into
                  because it has the highest Ivy League acceptance rate. While
                  it's easier, statistically speaking, to get into Cornell, it's
                  still challenging. It's also important to remember that
                  students apply directly to one of Cornell's eight
                  undergraduate colleges.
                </div>
              </div>
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
              <div className="each-mypaths-data1">
                <div className="each-mypaths-detail">
                  <div className="each-mypathsName">
                    <div>
                      <img src={dummy} alt="" />
                    </div>
                    <div>
                      <div>Step name</div>
                      <div style={{ fontSize: "0.8rem", fontWeight: "300" }}>
                        Step id
                      </div>
                    </div>
                  </div>
                  <div className="each-mypathsCountry">India</div>
                  <div className="each-mypathsCountry">Education</div>
                  <div className="each-mypathsCountry">Free</div>
                  <div className="each-mypathsVendors">3</div>
                  <div className="each-mypathsVendors">5</div>
                  <div className="each-mypathsMicrosteps">5</div>
                </div>
                <div className="each-mypaths-desc">
                  <div className="each-mypaths-desc-txt">Description</div>
                  <div className="each-mypaths-desc-txt1">
                    There are certain transactions that happen in every app
                    regardless of the business. The revenue from these
                    transactions are captured by us and we want to share it with
                    you.{" "}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPaths;
