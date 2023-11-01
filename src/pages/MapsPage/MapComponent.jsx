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
import { csv } from "d3-fetch";
import "./mapcomponent.scss";
import worldCountriesData from "./message.json";

const geoUrl =
  "https://bitbucket.org/globalxchange/topology/raw/82563f00ca0d655d4de61a65688c10e91585d8e7/world-countries.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapComponent = () => {
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(1);
  const [data, setData] = useState([]);

  const handleGeographyClick = (geo) => {
    const newZoom = zoom === 1 ? 2 : 1;
    const newCenter = geo.properties.centroid;
    setZoom(newZoom);
    setCenter(newCenter);
  };

  return (
    <div className="map-component">
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        <Geographies geography={worldCountriesData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleGeographyClick(geo)}
                  style={{
                    default: {
                      fill: "#59a2dd",
                    },
                    hover: {
                      fill: "#343c5b",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapComponent;
