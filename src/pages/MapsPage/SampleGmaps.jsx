import React, { useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./googlemapcomponent.scss";

const GoogleMapComponent = ({
  map,
  setMap,
  searchTerm,
  currentLocation,
  setCurrentLocation,
  placeInfo,
  selectedPlace,
  directions,
  setDirections,
  selectedLocation,
}) => {

  const directionsService = new window.google.maps.DirectionsService(); // Create DirectionsService instance

  // Handle directions response
  const handleDirectionsResponse = (response, status) => {
    if (status === "OK") {
      setDirections(response); // Set the directions result here
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setDirections(response);
      directionsRenderer.setMap(map);
    } else {
      console.error("Error fetching directions:", status);
    }
  };

  // Fetch directions when selectedPlace changes
  useEffect(() => {
    if (map && currentLocation !== null && selectedLocation !== null) {
      directionsService.route(
        {
          origin: currentLocation,
          destination: selectedLocation, // Assuming selectedPlace has geometry and location
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        handleDirectionsResponse
      );
    }
  }, [map, currentLocation, selectedLocation]);

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
          {currentLocation !== null &&
            selectedLocation !== null &&
            directions !== null && (
              <DirectionsRenderer directions={directions} />
            )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default GoogleMapComponent;
