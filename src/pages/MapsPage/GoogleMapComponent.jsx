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
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB5MJ2jMHzl_ghkbxOsyPmeBmYw_sUsIRQ",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return (
      <div className="gmap-container">
        <div>Loading..</div>
      </div>
    );
  }

  return (
    <div className="gmap-container">
      <div className="map-content">
        <GoogleMap
          center={currentLocation}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            streetViewControl: true,
            mapTypeControl: true,
          }}
          onLoad={(map) => setMap(map)}
        >
          {currentLocation && <Marker position={currentLocation} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default GoogleMapComponent;
