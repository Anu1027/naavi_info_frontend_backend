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
// import { scaleLinear } from "d3-scale";
import "./mapstyle.scss";

const geoUrl =
  "https://bitbucket.org/globalxchange/topology/raw/82563f00ca0d655d4de61a65688c10e91585d8e7/world-countries.json";

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
    <div className="mapStyle">
      <ComposableMap>
        <ZoomableGroup center={center} zoom={zoom}>
          {/* <Sphere stroke="#E4E5E6" strokeWidth={1} />
          <Graticule stroke="#E4E5E6" strokeWidth={1} /> */}
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
