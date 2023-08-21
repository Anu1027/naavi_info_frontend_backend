import React, { useState, useEffect, useRef } from "react";
import GoogleMapComponent from "./GoogleMapComponent";
import "./mapspage.scss";
import {
  Autocomplete,
} from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//images
import plus from "../../static/images/mapspage/plus.svg";
import close from "../../static/images/mapspage/close.svg";
import hamIcon from "../../static/images/icons/hamIcon.svg";

const libraries = ["places"];

const MapsPage = () => {
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
    setContainers([
      { id: 1, inputValue1: "", inputValue2: "", removable: false },
    ]);
    setResetLocation(!resetLoaction);
    setSelectedPlace(null);
    setPlacesId(null);
    setPlaceInfo("");
    setSelectedDate(null);
    setShowDatePicker(false);
    setDirections(null);
    setSelectedLocation(null);
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

  return (
    <div className="mapspage">
      <LoadScript
        googleMapsApiKey="AIzaSyB5MJ2jMHzl_ghkbxOsyPmeBmYw_sUsIRQ"
        libraries={libraries}
      >
        <div className="maps-navbar">
          <div className="hamMenu">
            <img src={hamIcon} alt="" />
          </div>
        </div>
        <div className="maps-container">
          <div className="maps-sidebar">
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
                        value={selectedPlace || ""}
                        onChange={(e) => {
                          handleInputChange(e, container.id, 1);
                          setSelectedPlace(e.target.value);
                        }}
                      />
                    </Autocomplete>
                  </div>
                  <div className="input-div2">
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
            />
          </div>
        </div>
      </LoadScript>
    </div>
  );
};

export default MapsPage;
