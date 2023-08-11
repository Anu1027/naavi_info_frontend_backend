import React from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import "./googlemapcomponent.scss";

const GoogleMapComponent = ({
  map,
  setMap,
  searchTerm,
  currentLocation,
  setCurrentLocation,
}) => {

  return (
    <div className="gmap-container">
      <div className="map-content">
        <GoogleMap
          center={currentLocation}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onLoad={(map) => setMap(map)}
        >
          {currentLocation && <Marker position={currentLocation} />}
        </GoogleMap>
      </div>
      {/* <div className="place-details"></div> */}
    </div>
  );
};

export default GoogleMapComponent;
