import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./mapspage.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCoinContextData } from "../../context/CoinContext";
import Pathview from "./PathView";
import MapComponent from "./MapComponent";
import axios from "axios";

//images
import logo from "../../static/images/logo.svg";
import careerIcon from "../../static/images/mapspage/careerIcon.svg";
import educationIcon from "../../static/images/mapspage/educationIcon.svg";
import immigrationIcon from "../../static/images/mapspage/immigrationIcon.svg";
import plus from "../../static/images/mapspage/plus.svg";
import close from "../../static/images/mapspage/close.svg";
import hamIcon from "../../static/images/icons/hamIcon.svg";
import arrow from "./darrow.svg";

const libraries = ["places"];

const MapsPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    preLoginMenu,
    setPreLoginMenu,
    schoolSearch,
    setSchoolSearch,
    programSearch,
    setProgramSearch,
    showDdown,
    setShowDdown,
    preLoginPathViewData,
    setPreLoginPathViewData,
  } = useCoinContextData();
  const [option, setOption] = useState("Education");
  const [containers, setContainers] = useState([
    { id: 1, inputValue1: "", inputValue2: "", removable: false },
  ]);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const autocompleteRef = useRef(null);
  const [resetLoaction, setResetLocation] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placesId, setPlacesId] = useState(null);
  const [placeInfo, setPlaceInfo] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [directions, setDirections] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDirections, setShowDirections] = useState(true);
  const [pathOption, setPathOption] = useState("Path View");
  const [switchToStep, setSwitchToStep] = useState(false);
  const [switchStepsDetails, setSwitchStepsDetails] = useState([]);
  const [grade, setGrade] = useState([]);
  const [gradeAvg, setGradeAvg] = useState([]);
  const [curriculum, setCurriculum] = useState([]);
  const [stream, setStream] = useState([]);
  const [finance, setFinance] = useState([]);
  const streamList = ["MPC", "BIPC", "CEC", "MEC", "HEC"];
  const curriculumList = ["IB", "IGCSE", "CBSE", "ICSE", "Nordic"];
  const gradeList = ["9", "10", "11", "12"];
  const gradePointAvg = [
    "0% - 35%",
    "36% - 60%",
    "61% - 75%",
    "76% - 85%",
    "86% - 95%",
    "96% - 100%",
  ];
  const financeList = ["0-25L", "25L-75L", "75L-3CR", "3CR+", "Other"];
  const [loading1, setLoading1] = useState(false);

  const handleAddContainer = () => {
    const lastContainer = containers[containers.length - 1];
    const newContainerId = lastContainer.id + 1;
    const newContainer = {
      id: newContainerId,
      inputValue1: "",
      inputValue2: "",
      removable: true,
    };
    setContainers([...containers, newContainer]);
  };

  const handleRemoveContainer = (containerId) => {
    const updatedContainers = containers.filter(
      (container) => container.id !== containerId
    );
    // Renumber the containers after removing one
    const renumberedContainers = updatedContainers.map((container, index) => {
      return { ...container, id: index + 1 };
    });
    setContainers(renumberedContainers);
  };

  const handleInputChange = (e, containerId, inputIndex) => {
    const updatedContainers = [...containers];
    const containerIndex = updatedContainers.findIndex(
      (container) => container.id === containerId
    );

    if (containerIndex !== -1) {
      if (inputIndex === 1) {
        updatedContainers[containerIndex].inputValue1 = e.target.value;
      } else if (inputIndex === 2) {
        updatedContainers[containerIndex].inputValue2 = e.target.value;
      }

      setContainers(updatedContainers);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setSelectedPlace("");
      setSelectedLocation(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, [resetLoaction]);

  const handleResetContainer = () => {
    // const directionsRenderer = new window.google.maps.DirectionsRenderer();
    // directionsRenderer.setMap(map);
    // directionsRenderer.setDirections({ routes: [] }); // Clear directions
    // setContainers([
    //   { id: 1, inputValue1: "", inputValue2: "", removable: false },
    // ]);
    // setResetLocation(!resetLoaction);
    // setSelectedPlace(null);
    // setPlacesId(null);
    // setPlaceInfo("");
    // setSelectedDate(null);
    // setShowDatePicker(false);
    // setDirections(null);
    // setSelectedLocation(null);
    // setShowDirections(false);
    window.location.reload();
  };

  const handlePlaceSelect = () => {
    if (autocompleteRef?.current) {
      const place = autocompleteRef?.current?.getPlace();
      if (place?.geometry && place?.geometry?.location) {
        const location = {
          lat: place?.geometry?.location?.lat(),
          lng: place?.geometry?.location?.lng(),
        };
        setSelectedLocation(location);
        setSelectedPlace(place?.formatted_address);
        const placeId = place?.place_id;
        setPlacesId(placeId);
        if (map) {
          map.panTo(location);
        }
      }
    }
  };

  const fetchPlaceDetails = async (placeId) => {
    // console.log(placeId, 'placeid')
    if (placeId !== null) {
      try {
        const response = await fetch(
          `https://careers.marketsverse.com/api/places?place_id=${placeId}`
        );
        const data = await response.json();
        // console.log(data?.result, "place info");
        setPlaceInfo(data?.result);
        return data.result;
      } catch (error) {
        console.log(error, "error in getting place info");
      }
    }
  };

  useEffect(() => {
    fetchPlaceDetails(placesId);
  }, [placesId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      placeholder="By When?"
      value={value}
      onClick={onClick}
      onFocus={() => setShowDatePicker(true)}
      onBlur={() => setShowDatePicker(false)}
    />
  );

  useEffect(() => {
    setLoading1(true);
    axios
      .post(`https://careers.marketsverse.com/paths/get`)
      .then((response) => {
        let result = response?.data?.data;
        // console.log(result, "path view result");
        setPreLoginPathViewData(result);
        setLoading1(false);
      })
      .catch((error) => {
        console.log(error, "error in getting pre-login path view result");
        setPreLoginPathViewData([]);
        setLoading1(false);
      });
  }, []);

  useEffect(() => {
    if (pathname.includes("/maps")) {
      setPreLoginMenu("Paths");
    }
  }, []);

  const handleGrade = (item) => {
    if (grade.includes(item)) {
      // If the grade is already selected, remove it
      setGrade(grade.filter((o) => o !== item));
    } else {
      // If the grade is not selected, add it
      setGrade([...grade, item]);
    }
  };

  const handleGradeAvg = (item) => {
    if (gradeAvg.includes(item)) {
      // If the gradeAvg is already selected, remove it
      setGradeAvg(gradeAvg.filter((o) => o !== item));
    } else {
      // If the gradeAvg is not selected, add it
      setGradeAvg([...gradeAvg, item]);
    }
  };

  const handleCurriculum = (item) => {
    if (curriculum.includes(item)) {
      // If the curriculum is already selected, remove it
      setCurriculum(curriculum.filter((o) => o !== item));
    } else {
      // If the curriculum is not selected, add it
      setCurriculum([...curriculum, item]);
    }
  };

  const handleStream = (item) => {
    if (stream.includes(item)) {
      // If the stream is already selected, remove it
      setStream(stream.filter((o) => o !== item));
    } else {
      // If the stream is not selected, add it
      setStream([...stream, item]);
    }
  };

  const handleFinance = (item) => {
    if (finance.includes(item)) {
      // If the finance is already selected, remove it
      setFinance(finance.filter((o) => o !== item));
    } else {
      // If the finance is not selected, add it
      setFinance([...finance, item]);
    }
  };

  const handleFilter = () => {
    let obj = {};

    if (grade.length > 0) {
      obj.grade = grade;
    }

    if (stream.length > 0) {
      obj.stream = stream;
    }

    if (curriculum.length > 0) {
      obj.curriculum = curriculum;
    }

    if (gradeAvg.length > 0) {
      obj.performance = gradeAvg;
    }

    if (finance.length > 0) {
      obj.financialSituation = finance;
    }

    setLoading1(true);
    axios
      .post(`https://careers.marketsverse.com/paths/get`, obj)
      .then((response) => {
        let result = response?.data?.data;
        setPreLoginPathViewData(result);
        setLoading1(false);
      })
      .catch((error) => {
        console.log(error, "error in getting filtered path view result");
        setPreLoginPathViewData([]);
        setLoading1(false);
      });
  };

  return (
    <div className="mapspage">
      <div className="maps-navbar">
        <div className="hamMenu">
          <img src={hamIcon} alt="" />
        </div>
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="logo" />
        </div>
        <div className="menu-items">
          <div
            onClick={() => {
              navigate("/");
              setPreLoginMenu("About Us");
            }}
          >
            <p style={{ fontWeight: preLoginMenu === "About Us" ? "600" : "" }}>
              About Us
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/maps");
              setPreLoginMenu("Paths");
            }}
          >
            <p style={{ fontWeight: preLoginMenu === "Paths" ? "600" : "" }}>
              Paths
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/directory/nodes");
              setPreLoginMenu("Partners");
            }}
          >
            <p style={{ fontWeight: preLoginMenu === "Partners" ? "600" : "" }}>
              Partners
            </p>
          </div>
        </div>
        <div className="btns-div">
          <div
            className="gs-Btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Get Started
          </div>
        </div>
      </div>
      <div className="maps-color-box"></div>
      <div className="maps-container">
        <div className="maps-sidebar">
          <div className="top-icons">
            <div
              className="each-icon"
              // onClick={() => {
              //   setOption("Career");
              // }}
              style={{
                opacity: 0.5,
                cursor: "not-allowed",
              }}
            >
              <div
                className="border-div"
                style={{
                  border:
                    option === "Career"
                      ? "1px solid #100F0D"
                      : "1px solid #e7e7e7",
                }}
              >
                <img src={careerIcon} alt="" />
              </div>
              <div
                className="icon-name-txt"
                style={{
                  fontWeight: option === "Career" ? "600" : "",
                }}
              >
                Career
              </div>
            </div>
            <div
              className="each-icon"
              onClick={() => {
                setOption("Education");
              }}
            >
              <div
                className="border-div"
                style={{
                  border:
                    option === "Education"
                      ? "1px solid #100F0D"
                      : "1px solid #e7e7e7",
                }}
              >
                <img src={educationIcon} alt="" />
              </div>
              <div
                className="icon-name-txt"
                style={{
                  fontWeight: option === "Education" ? "600" : "",
                }}
              >
                Education
              </div>
            </div>
            <div
              className="each-icon"
              // onClick={() => {
              //   setOption("Immigration");
              // }}
              style={{
                opacity: 0.5,
                cursor: "not-allowed",
              }}
            >
              <div
                className="border-div"
                style={{
                  border:
                    option === "Immigration"
                      ? "1px solid #100F0D"
                      : "1px solid #e7e7e7",
                }}
              >
                <img src={immigrationIcon} alt="" />
              </div>
              <div
                className="icon-name-txt"
                style={{
                  fontWeight: option === "Immigration" ? "600" : "",
                }}
              >
                Immigration
              </div>
            </div>
          </div>
          <div className="mid-area">
            <div className="s-destination-div">
              <div>Search Destination</div>
              <div className="input-div1">
                <input
                  type="text"
                  placeholder="What school?"
                  onChange={(e) => {
                    setSchoolSearch(e.target.value);
                    setProgramSearch("");
                  }}
                  value={schoolSearch}
                />
              </div>
              <div className="input-div1">
                <input
                  type="text"
                  placeholder="What program?"
                  onChange={(e) => {
                    setProgramSearch(e.target.value);
                    setSchoolSearch("");
                  }}
                  value={programSearch}
                />
              </div>
            </div>
            <div className="each-filter-div">
              <div
                className="visible-div"
                onClick={() => {
                  if (showDdown === "Grade") {
                    setShowDdown("");
                  } else {
                    setShowDdown("Grade");
                  }
                }}
              >
                <div>You’re Current Grade</div>
                <div>
                  <img
                    src={arrow}
                    alt=""
                    style={{
                      transform: showDdown === "Grade" ? "rotate(180deg)" : "",
                    }}
                  />
                </div>
              </div>
              <div
                className="hidden-div"
                style={{
                  display: showDdown === "Grade" ? "flex" : "none",
                }}
              >
                <div
                  className="optioncardWrapper"
                  style={{ width: "100%", flexWrap: "wrap", gap: "1rem" }}
                >
                  {gradeList.map((item) => (
                    <div
                      className={
                        grade.includes(item)
                          ? "optionCardSmallSelected"
                          : "optionCardSmall"
                      }
                      onClick={(e) => handleGrade(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="each-filter-div">
              <div
                className="visible-div"
                onClick={() => {
                  if (showDdown === "Grade Point") {
                    setShowDdown("");
                  } else {
                    setShowDdown("Grade Point");
                  }
                }}
              >
                <div>You’re Current Grade Point Avg</div>
                <div>
                  <img
                    src={arrow}
                    alt=""
                    style={{
                      transform:
                        showDdown === "Grade Point" ? "rotate(180deg)" : "",
                    }}
                  />
                </div>
              </div>
              <div
                className="hidden-div1"
                style={{
                  display: showDdown === "Grade Point" ? "flex" : "none",
                }}
              >
                <div className="optionCardFullWrapper">
                  {gradePointAvg.map((item) => (
                    <div
                      className={
                        gradeAvg.includes(item)
                          ? "optionCardFullSelected"
                          : "optionCardFull"
                      }
                      onClick={(e) => handleGradeAvg(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="each-filter-div">
              <div
                className="visible-div"
                onClick={() => {
                  if (showDdown === "Stream") {
                    setShowDdown("");
                  } else {
                    setShowDdown("Stream");
                  }
                }}
              >
                <div>You’re Current Stream</div>
                <div>
                  <img
                    src={arrow}
                    alt=""
                    style={{
                      transform: showDdown === "Stream" ? "rotate(180deg)" : "",
                    }}
                  />
                </div>
              </div>
              <div
                className="hidden-div1"
                style={{
                  display: showDdown === "Stream" ? "flex" : "none",
                }}
              >
                <div className="optionCardFullWrapper">
                  {streamList.map((item) => (
                    <div
                      className={
                        stream.includes(item)
                          ? "optionCardFullSelected"
                          : "optionCardFull"
                      }
                      onClick={(e) => handleStream(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="each-filter-div">
              <div
                className="visible-div"
                onClick={() => {
                  if (showDdown === "Curriculum") {
                    setShowDdown("");
                  } else {
                    setShowDdown("Curriculum");
                  }
                }}
              >
                <div>You’re Current Curriculum</div>
                <div>
                  <img
                    src={arrow}
                    alt=""
                    style={{
                      transform:
                        showDdown === "Curriculum" ? "rotate(180deg)" : "",
                    }}
                  />
                </div>
              </div>
              <div
                className="hidden-div1"
                style={{
                  display: showDdown === "Curriculum" ? "flex" : "none",
                }}
              >
                <div className="optionCardFullWrapper">
                  {curriculumList.map((item) => (
                    <div
                      className={
                        curriculum.includes(item)
                          ? "optionCardFullSelected"
                          : "optionCardFull"
                      }
                      onClick={(e) => handleCurriculum(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="each-filter-div">
              <div
                className="visible-div"
                onClick={() => {
                  if (showDdown === "Financial") {
                    setShowDdown("");
                  } else {
                    setShowDdown("Financial");
                  }
                }}
              >
                <div>You’re Current Financial Position</div>
                <div>
                  <img
                    src={arrow}
                    alt=""
                    style={{
                      transform:
                        showDdown === "Financial" ? "rotate(180deg)" : "",
                    }}
                  />
                </div>
              </div>
              <div
                className="hidden-div1"
                style={{
                  display: showDdown === "Financial" ? "flex" : "none",
                }}
              >
                <div className="optionCardFullWrapper">
                  {financeList.map((item) => (
                    <div
                      className={
                        finance.includes(item)
                          ? "optionCardFullSelected"
                          : "optionCardFull"
                      }
                      onClick={(e) => handleFinance(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="maps-btns-div">
              <div
                className="gs-Btn-maps"
                onClick={() => {
                  handleFilter();
                }}
              >
                Find Paths
              </div>
            </div>
          </div>
        </div>
        <div className="maps-content-area">
          <div className="path-options-div1">
            <div className="path-options1">
              <div className="each-path-opt1">Path View</div>
              <div
                className="toggleContainer2"
                onClick={() => {
                  if (pathOption === "Path View") {
                    setPathOption("Map View");
                  } else {
                    setPathOption("Path View");
                    setSwitchToStep(false);
                    setSwitchStepsDetails([]);
                  }
                }}
              >
                <div
                  className="toggle2"
                  style={{
                    transform:
                      pathOption === "Path View"
                        ? "translateX(0px)"
                        : "translateX(20px)",
                  }}
                >
                  &nbsp;
                </div>
              </div>
              <div className="each-path-opt1">Map View</div>
            </div>
          </div>
          {pathOption === "Map View" ? (
            <MapComponent />
          ) : (
            <Pathview
              switchToStep={switchToStep}
              setSwitchToStep={setSwitchToStep}
              switchStepsDetails={switchStepsDetails}
              setSwitchStepsDetails={setSwitchStepsDetails}
              loading1={loading1}
              setLoading1={setLoading1}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MapsPage;

{
  /* <div className="mapspage">
      <LoadScript
        googleMapsApiKey="AIzaSyB5MJ2jMHzl_ghkbxOsyPmeBmYw_sUsIRQ"
        libraries={libraries}
      >
        <div className="maps-navbar">
          <div className="hamMenu">
            <img src={hamIcon} alt="" />
          </div>
          <div
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="logo" />
          </div>
          <div className="menu-items">
            <div>
              <p>Paths</p>
            </div>
            <div>
              <p>Explore</p>
            </div>
            <div>
              <p>Products</p>
            </div>
            <div>
              <p>Resources</p>
            </div>
            <div
              onClick={() => {
                navigate("/directory/nodes");
              }}
            >
              <p>Partners</p>
            </div>
          </div>
          <div className="btns-div">
            <div
              className="gs-Btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              Get Started
            </div>
          </div>
        </div>
        <div className="maps-color-box"></div>
        <div className="maps-container">
          <div className="maps-sidebar">
            <div className="top-icons">
              <div
                className="each-icon"
                onClick={() => {
                  setOption("Career");
                }}
              >
                <div
                  className="border-div"
                  style={{
                    border:
                      option === "Career"
                        ? "1px solid #100F0D"
                        : "1px solid #e7e7e7",
                  }}
                >
                  <img src={careerIcon} alt="" />
                </div>
                <div
                  className="icon-name-txt"
                  style={{
                    fontWeight: option === "Career" ? "600" : "",
                  }}
                >
                  Career
                </div>
              </div>
              <div
                className="each-icon"
                onClick={() => {
                  setOption("Education");
                }}
              >
                <div
                  className="border-div"
                  style={{
                    border:
                      option === "Education"
                        ? "1px solid #100F0D"
                        : "1px solid #e7e7e7",
                  }}
                >
                  <img src={educationIcon} alt="" />
                </div>
                <div
                  className="icon-name-txt"
                  style={{
                    fontWeight: option === "Education" ? "600" : "",
                  }}
                >
                  Education
                </div>
              </div>
              <div
                className="each-icon"
                onClick={() => {
                  setOption("Immigration");
                }}
              >
                <div
                  className="border-div"
                  style={{
                    border:
                      option === "Immigration"
                        ? "1px solid #100F0D"
                        : "1px solid #e7e7e7",
                  }}
                >
                  <img src={immigrationIcon} alt="" />
                </div>
                <div
                  className="icon-name-txt"
                  style={{
                    fontWeight: option === "Immigration" ? "600" : "",
                  }}
                >
                  Immigration
                </div>
              </div>
            </div>
            <div className="mid-area">
              <div className="input-div1">
                <input
                  type="text"
                  placeholder="Choose Starting Coordinates.."
                />
              </div>
              {containers.map((container, index) => (
                <div className="destination-container" key={container.id}>
                  <div className="dest-txt">
                    <div>Destination {container.id}</div>
                    {container.removable && (
                      <div onClick={() => handleRemoveContainer(container.id)}>
                        <img src={close} alt="" />
                      </div>
                    )}
                  </div>
                  <div className="input-div2">
                    <Autocomplete
                      onLoad={(autocomplete) => {
                        autocompleteRef.current = autocomplete;
                        autocomplete?.setBounds(map?.getBounds());
                      }}
                      onPlaceChanged={handlePlaceSelect}
                    >
                      <input
                        type="text"
                        placeholder="Where Do You Want To Go?"
                        // value={container.inputValue1}
                        // onChange={(e) => {
                        //   handleInputChange(e, container.id, 1);
                        //   setSearchTerm(e.target.value);
                        // }}
                        value={selectedPlace || ""}
                        onChange={(e) => {
                          handleInputChange(e, container.id, 1);
                          setSelectedPlace(e.target.value);
                        }}
                      />
                    </Autocomplete>
                  </div>
                  <div className="input-div2">
                    // <input
                    //   type="text"
                    //   placeholder="By When?"
                    //   // value={container.inputValue2}
                    //   // onChange={(e) => handleInputChange(e, container.id, 2)}
                    //   // onFocus={() => setShowDatePicker(true)}
                    //   // onBlur={() => setShowDatePicker(false)}
                    //   onFocus={(e) => e.target.blur()}
                    //   value={
                    //     selectedDate ? selectedDate.toLocaleDateString() : ""
                    //   }
                    // /> 
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="MM/dd/yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      customInput={<CustomInput />}
                    />
                  </div>
                </div>
              ))}
              <div className="add-div" onClick={handleAddContainer}>
                <img src={plus} alt="" />
                Add Destination
              </div>
              <div className="maps-btns-div">
                <div className="gs-Btn-maps">Get Started</div>
                <div className="reset-btn" onClick={handleResetContainer}>
                  Reset
                </div>
              </div>
            </div>
          </div>
          <div className="maps-content-area">
            <div className="path-options-div1">
              <div className="path-options1">
                <div className="each-path-opt1">Path View</div>
                <div
                  className="toggleContainer2"
                  onClick={() => {
                    if (pathOption === "Path View") {
                      setPathOption("Map View");
                    } else {
                      setPathOption("Path View");
                      setSwitchToStep(false);
                      setSwitchStepsDetails([]);
                    }
                  }}
                >
                  <div
                    className="toggle2"
                    style={{
                      transform:
                        pathOption === "Path View"
                          ? "translateX(0px)"
                          : "translateX(20px)",
                    }}
                  >
                    &nbsp;
                  </div>
                </div>
                <div className="each-path-opt1">Map View</div>
              </div>
            </div>
            {pathOption === "Map View" ? (
              <GoogleMapComponent
                map={map}
                setMap={setMap}
                searchTerm={searchTerm}
                currentLocation={currentLocation}
                setCurrentLocation={setCurrentLocation}
                placeInfo={placeInfo}
                selectedPlace={selectedPlace}
                directions={directions}
                setDirections={setDirections}
                selectedLocation={selectedLocation}
                showDirections={showDirections}
              />
            ) : (
              <Pathview
                switchToStep={switchToStep}
                setSwitchToStep={setSwitchToStep}
                switchStepsDetails={switchStepsDetails}
                setSwitchStepsDetails={setSwitchStepsDetails}
              />
            )}
          </div>
        </div>
      </LoadScript>
    </div> */
}
