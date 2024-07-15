import React, { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "./pathview.scss";
import { useCoinContextData } from "../../context/CoinContext";
import { useNavigate } from "react-router-dom";
import jsonData  from './getPaths.json';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const data = jsonData.data || [];

const Pathview = ({
  switchToStep,
  setSwitchToStep,
  switchStepsDetails,
  setSwitchStepsDetails,
  loading1,
  setLoading1,
  setSelectedLocation,
  setPreLoginPathId,
}) => {
  const {
    schoolSearch,
    setSchoolSearch,
    programSearch,
    setProgramSearch,
    preLoginPathViewData,
  } = useCoinContextData();

  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const [visibleButtons, setVisibleButtons] = useState(
    Array(preLoginPathViewData?.length)?.fill(false)
  );
  const [visibleButtonIndex, setVisibleButtonIndex] = useState(null);

  const toggleButtonVisibility = (index) => {
    // Toggle visibility for the clicked item
    const newVisibility = [...visibleButtons];
    newVisibility[index] = !newVisibility[index];
    setVisibleButtons(newVisibility);

    // If clicking a different item, hide the previously clicked item
    if (visibleButtonIndex !== null && visibleButtonIndex !== index) {
      newVisibility[visibleButtonIndex] = false;
      setVisibleButtons(newVisibility);
    }

    // Update the visible button index
    setVisibleButtonIndex(newVisibility[index] ? index : null);
  };

  const getStepsForSelectedPath = (selectedPath) => {
    setIsloading(true);

    // Simulate the delay caused by API call with setTimeout
    setTimeout(() => {
      const result = data.find(item => item.nameOfPath === selectedPath);
      setSwitchStepsDetails(result);
      setIsloading(false);
    }, 1000); // Adjust the delay as needed
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
                    toggleButtonVisibility(i);
                    setSelectedLocation(e?.destination_institution);
                  }}
                >
                  <div className="each-pv-name1-div">
                    <div className="each-pv-name1">
                      {e?.destination_institution}
                    </div>
                    <div className="each-pv-name1">{e?.program}</div>
                  </div>
                  <div className="each-pv-desc1">{e?.description}</div>
                  <div
                    className={`see-steps-btn ${
                      visibleButtons[i] ? "visible" : "hidden"
                    }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      getStepsForSelectedPath(e?.nameOfPath);
                      setSwitchToStep(true);
                      setPreLoginPathId(e?._id);
                    }}
                  >
                    See Steps
                  </div>
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
