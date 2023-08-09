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
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const handleGeographyClick = (geo) => {
    const newZoom = zoom === 1 ? 2 : 1;
    const newCenter = geo.properties.centroid;
    setZoom(newZoom);
    setCenter(newCenter);
  };

  const handleGeographyHover = (geo) => {
    if (geo?.properties && geo?.properties?.name && geo?.properties?.centroid) {
      setHoveredCountry(geo?.properties?.name);
    } else {
      setHoveredCountry(null);
    }
  };

  return (
    <div className="map-component1">
      <ComposableMap>
        <ZoomableGroup center={center} zoom={zoom}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <React.Fragment key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    onClick={() => handleGeographyClick(geo)}
                    onMouseEnter={() => {
                      // console.log("Hovered: ", geo?.properties?.name);
                      handleGeographyHover(geo);
                    }}
                    onMouseLeave={() => {
                      // console.log("Left: ", geo?.properties?.name);
                      setHoveredCountry(null);
                    }}
                    style={{
                      hover: {
                        fill: "#46B2D3",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                  {hoveredCountry === geo?.properties?.name && (
                    <Annotation
                      subject={geo?.properties?.centroid}
                      dx={0}
                      dy={-20}
                      connectorProps={{
                        stroke: "#FF5533",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                      }}
                      style={{
                        border: "1px solid red",
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <text
                        fontSize={12}
                        textAnchor="middle"
                        style={{
                          fill: "#D0D0D0",
                          pointerEvents: "none",
                          backgroundColor: "#323232",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        {geo?.properties?.name}
                      </text>
                    </Annotation>
                  )}
                </React.Fragment>
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapComponent;
