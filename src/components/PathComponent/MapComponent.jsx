import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import "./mapcomponent.scss";

const MapComponent = ({
  pathMap,
  setPathMap,
  pathSearchTerm,
  pathCurrentLocation,
  setPathCurrentLocation,
}) => {
  return (
    <div className="map-component1">
      <div className="map-content1">
        <GoogleMap
          center={pathCurrentLocation}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onLoad={(pathMap) => setPathMap(pathMap)}
        >
          {pathCurrentLocation && <Marker position={pathCurrentLocation} />}
        </GoogleMap>
      </div>
      {/* <div className="place-details1"></div> */}
    </div>
  );
};

export default MapComponent;
