import React, { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import CustomModal from "./CustomModal";
import ModalTesting from "./ModalTesting";

const PointsCluster = ({ points, searchResult }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <MarkerClusterGroup
      showCoverageOnHover={true}
      disableClusteringAtZoom={18}
      spiderfyOnMaxZoom={false}
      maxClusterRadius={45}
    >
      <div>
        {points.map((point) => {
          return (
            <div key={point.properties.placeId}>
              <Marker
                position={[
                  point.geometry.coordinates[1],
                  point.geometry.coordinates[0],
                ]}
              >
                <Popup>
                  {point.properties.placeName
                    ? point.properties.placeName
                    : "No Name Found"}
                  <button
                    className='popup-button'
                    onClick={() => setShow(true)}
                  >
                    More Info
                  </button>
                  <CustomModal
                    show={show}
                    handleClose={handleClose}
                    id={point.properties.placeId}
                  />
                </Popup>
              </Marker>
            </div>
          );
        })}
      </div>
    </MarkerClusterGroup>
  );
};

export default PointsCluster;
