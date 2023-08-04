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
"https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

//   "https://github.com/johan/world.geo.json/blob/master/countries.geo.json";
//   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0, 6300000])
  .range(["#a72bb5", "0376db"]);

const MapComponent = () => {
  const [countries, setCountries] = useState([]);
  const [continents, setContinents] = useState([]);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

//   const getData = () => {
//     fetch("http://localhost:3001/countries", {
//       header: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setCountries(data));
//   };

//   const getContData = () => {
//     fetch("http://localhost:3001/continent", {
//       header: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setContinents(data));
//   };

//   const handleMoveEnd = () => {
//     setPosition(position);
//   };

//   useEffect(() => {
//     getData();
//     getContData();
//   }, []);

  return (
    <div className="map-component">
      {/* <ComposableMap
        width={900}
        height={400}
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        {countries?.length > 0 ? (
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Sphere stroke="#000" strokeWidth={0.3} />
            <Graticule stroke="#000" strokeWidth={0.3} />
            <Geographies geography='./features.json'>
              {({ geographies }) =>
                geographies.map((geo, index) => {
                  const isos = countries.find(
                    (s) => s.ISO3 === geo.properties.ISO_A3
                  );
                  return (
                    <>
                      <Geography
                        key={index}
                        geography={geo}
                        fill={
                          isos ? colorScale(isos["population_density"]) : "#333"
                        }
                      />
                      <Annotation
                        subject={(-100.4173, 38.9071)}
                        dx={70}
                        dy={-40}
                        connectorProps={{
                          stroke: "#999",
                          strokeWidth: 1,
                        }}
                      >
                        <rect
                          width="65"
                          height="30"
                          style={{
                            x: 2,
                            y: -17,
                            fill: "rgb(0, 0, 0)",
                            fillOpacity: 0.01,
                            stroke: "rgb(0, 0, 0)",
                            strokeWidth: 1,
                            stopOpacity: 0.03,
                          }}
                        />
                      </Annotation>
                    </>
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        ) : (
          <div>Loading...</div>
        )}
      </ComposableMap> */}
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapComponent;
