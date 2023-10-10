import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "./MapComponent";
import Listview from "../Listview";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";
import "./mapspage.scss";
import DatePicker from "react-datepicker";
import { useCoinContextData } from "../../context/CoinContext";
import "react-datepicker/dist/react-datepicker.css";

//images
import logo from "../../static/images/logo.svg";
import careerIcon from "../../static/images/mapspage/careerIcon.svg";
import educationIcon from "../../static/images/mapspage/educationIcon.svg";
import immigrationIcon from "../../static/images/mapspage/immigrationIcon.svg";
import plus from "../../static/images/mapspage/plus.svg";
import close from "../../static/images/mapspage/close.svg";
import hamIcon from "../../static/images/icons/hamIcon.svg";
import axios from "axios";
import Pathview from "../Pathview";

const libraries = ["places"];

const PathComponent = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState("Education");
  const [containers, setContainers] = useState([
    { id: 1, inputValue1: "", inputValue2: "", removable: false },
  ]);
  const [pathOption, setPathOption] = useState("Map View");
  // const [searchTerm, setSearchterm] = useState("");
  const [pathMap, setPathMap] = useState(/** @type google.maps.Map */ (null));
  const [pathCurrentLocation, setPathCurrentLocation] = useState(null);
  const [pathSearchTerm, setPathSearchTerm] = useState("");
  const autocompleteRef = useRef(null);
  const [pathResetLoaction, setPathResetLocation] = useState(false);
  const [pathSelectedPlace, setPathSelectedPlace] = useState(null);
  const [pathPlacesId, setPathPlacesId] = useState(null);
  const [pathPlaceInfo, setPathPlaceInfo] = useState("");
  const [pathSelectedDate, setPathSelectedDate] = useState(null);
  const [pathShowDatePicker, setPathShowDatePicker] = useState(false);
  const [pathDirections, setPathDirections] = useState(null);
  const [pathSelectedLocation, setPathSelectedLocation] = useState(null);
  const [pathShowDirections, setPathShowDirections] = useState(true);
  const { searchTerm, setSearchterm } = useCoinContextData();

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
      setPathSelectedPlace("");
      setPathSelectedLocation(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPathCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(
            "Error getting current location in path component:",
            error
          );
        }
      );
    }
  }, [pathResetLoaction]);

  const handleResetContainer = () => {
    // const directionsRenderer = new window.google.maps.DirectionsRenderer();
    // directionsRenderer.setMap(map);
    // directionsRenderer.setDirections({ routes: [] }); // Clear directions
    // setContainers([
    //   { id: 1, inputValue1: "", inputValue2: "", removable: false },
    // ]);
    // if (pathOption === "List View") {
    //   setSearchterm("");
    // }
    // setPathResetLocation(!pathResetLoaction);
    // setPathSelectedPlace(null);
    // setPathPlacesId(null);
    // setPathPlaceInfo("");
    // setPathSelectedDate(null);
    // setPathShowDatePicker(false);
    // setPathDirections(null);
    // setPathSelectedLocation(null);
    // setPathShowDirections(null);
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
        setPathSelectedLocation(location);
        setPathSelectedPlace(place?.formatted_address);
        const placeId = place?.place_id;
        setPathPlacesId(placeId);
        if (pathMap) {
          pathMap.panTo(location);
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
        setPathPlaceInfo(data?.result);
        return data.result;
      } catch (error) {
        console.log(error, "error in getting place info in path component");
      }
    }
  };

  useEffect(() => {
    fetchPlaceDetails(pathPlacesId);
  }, [pathPlacesId]);

  const handleDateChange = (date) => {
    setPathSelectedDate(date);
    setPathShowDatePicker(false);
  };

  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      placeholder="By When?"
      value={value}
      onClick={onClick}
      onFocus={() => setPathShowDatePicker(true)}
      onBlur={() => setPathShowDatePicker(false)}
    />
  );

  return (
    <div className="mapspage1">
      <LoadScript
        googleMapsApiKey="AIzaSyB5MJ2jMHzl_ghkbxOsyPmeBmYw_sUsIRQ"
        libraries={libraries}
      >
        <div className="maps-container1">
          <div className="maps-sidebar1">
            <div className="top-icons1">
              <div
                className="each-icon1"
                // onClick={() => {
                //   setOption("Career");
                // }}
                style={{
                  cursor: "not-allowed",
                  opacity: 0.5,
                }}
              >
                <div
                  className="border-div1"
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
                  className="icon-name-txt1"
                  style={{
                    fontWeight: option === "Career" ? "600" : "",
                  }}
                >
                  Career
                </div>
              </div>
              <div
                className="each-icon1"
                onClick={() => {
                  setOption("Education");
                }}
              >
                <div
                  className="border-div1"
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
                  className="icon-name-txt1"
                  style={{
                    fontWeight: option === "Education" ? "600" : "",
                  }}
                >
                  Education
                </div>
              </div>
              <div
                className="each-icon1"
                // onClick={() => {
                //   setOption("Immigration");
                // }}
                style={{
                  cursor: "not-allowed",
                  opacity: 0.5,
                }}
              >
                <div
                  className="border-div1"
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
                  className="icon-name-txt1"
                  style={{
                    fontWeight: option === "Immigration" ? "600" : "",
                  }}
                >
                  Immigration
                </div>
              </div>
            </div>
            <div className="mid-area1">
              <div className="input-div-1">
                <input
                  type="text"
                  placeholder="Choose Starting Coordinates.."
                />
              </div>
              {containers.map((container, index) => (
                <div className="destination-container1" key={container.id}>
                  <div className="dest-txt1">
                    <div>Destination {container.id}</div>
                    {container.removable && (
                      <div onClick={() => handleRemoveContainer(container.id)}>
                        <img src={close} alt="" />
                      </div>
                    )}
                  </div>
                  <div className="input-div-2">
                    {pathOption === "Map View" ? (
                      <Autocomplete
                        onLoad={(autocomplete) => {
                          autocompleteRef.current = autocomplete;
                          autocomplete?.setBounds(pathMap?.getBounds());
                        }}
                        onPlaceChanged={handlePlaceSelect}
                      >
                        <input
                          type="text"
                          placeholder="Where Do You Want To Go?"
                          // value={container.inputValue1}
                          // onChange={(e) => {
                          //   handleInputChange(e, container.id, 1);
                          //   if (pathOption === "List View") {
                          //     setSearchterm(e.target.value);
                          //   }
                          // }}
                          value={pathSelectedPlace || ""}
                          onChange={(e) => {
                            handleInputChange(e, container.id, 1);
                            setPathSelectedPlace(e.target.value);
                            if (pathOption === "List View") {
                              setSearchterm(e.target.value);
                            }
                          }}
                        />
                      </Autocomplete>
                    ) : (
                      <input
                        type="text"
                        placeholder="Where Do You Want To Go?"
                        // value={container.inputValue1}
                        // onChange={(e) => {
                        //   handleInputChange(e, container.id, 1);
                        //   if (pathOption === "List View") {
                        //     setSearchterm(e.target.value);
                        //   }
                        // }}
                        value={searchTerm}
                        onChange={(e) => {
                          handleInputChange(e, container.id, 1);
                          setSearchterm(e.target.value);
                        }}
                      />
                    )}
                  </div>
                  <div className="input-div-2">
                    {/* <input
                      type="text"
                      value={container.inputValue2}
                      placeholder="By When?"
                      onChange={(e) => handleInputChange(e, container.id, 2)}
                    /> */}
                    <DatePicker
                      selected={pathSelectedDate}
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
              <div className="add-div1" onClick={handleAddContainer}>
                <img src={plus} alt="" />
                Add Destination
              </div>
              <div className="maps-btns-div1">
                <div className="gs-Btn-maps1">Get Started</div>
                <div className="reset-btn1" onClick={handleResetContainer}>
                  Reset
                </div>
              </div>
            </div>
          </div>
          <div className="maps-content-area1">
            <div className="path-options-div">
              <div className="path-options">
                <div
                  className="each-path-opt"
                  onClick={() => {
                    setPathOption("Path View");
                  }}
                  style={{
                    background: pathOption === "Path View" ? "#F1F4F6" : "",
                  }}
                >
                  Path View
                </div>

                <div
                  className="each-path-opt"
                  onClick={() => {
                    setPathOption("Map View");
                  }}
                  style={{
                    background: pathOption === "Map View" ? "#F1F4F6" : "",
                  }}
                >
                  Map View
                </div>

                <div
                  className="each-path-opt"
                  onClick={() => {
                    setPathOption("List View");
                  }}
                  style={{
                    background: pathOption === "List View" ? "#F1F4F6" : "",
                  }}
                >
                  List View
                </div>
              </div>
            </div>
            <>
              {pathOption === "Map View" ? (
                <MapComponent
                  pathMap={pathMap}
                  setPathMap={setPathMap}
                  pathSearchTerm={pathSearchTerm}
                  pathCurrentLocation={pathCurrentLocation}
                  setPathCurrentLocation={setPathCurrentLocation}
                  pathPlaceInfo={pathPlaceInfo}
                  pathSelectedPlace={pathSelectedPlace}
                  pathDirections={pathDirections}
                  setPathDirections={setPathDirections}
                  pathSelectedLocation={pathSelectedLocation}
                  pathShowDirections={pathShowDirections}
                />
              ) : pathOption === "List View" ? (
                <Listview />
              ) : (
                <Pathview />
              )}
            </>
          </div>
        </div>
      </LoadScript>
    </div>
  );
};

export default PathComponent;
