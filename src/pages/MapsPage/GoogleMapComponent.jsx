import React, { useState, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import "./googlemapcomponent.scss";

const GoogleMapComponent = ({ map, setMap }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB5MJ2jMHzl_ghkbxOsyPmeBmYw_sUsIRQ",
    libraries: ["places"],
  });
  const [currentLocation, setCurrentLocation] = useState(null);

  // Fetch current location using Geolocation API
  useEffect(() => {
    if (navigator?.geolocation) {
      navigator?.geolocation?.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, []);
 
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
