import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  ZoomableGroup,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import "./mapcomponent.scss";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const MapComponent = () => {
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(1);

  const handleGeographyClick = (geo) => {
    const newZoom = zoom === 1 ? 2 : 1;
    const newCenter = geo.properties.centroid;
    setZoom(newZoom);
    setCenter(newCenter);
  };

  return (
    <div className="map-component1">
      {/* <style>
        {`.map-component1 svg {
        width: 900px;
        height: 600px;
      }`}
      </style> */}
      <ComposableMap>
        <ZoomableGroup center={center} zoom={zoom}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleGeographyClick(geo)}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapComponent;
