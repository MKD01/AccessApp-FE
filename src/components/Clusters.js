import React, { useCallback, useEffect, useState } from "react";
import L, { MarkerCluster } from "leaflet";
import CustomModal from "./CustomModal";
import { Marker, Popup, GeoJSON } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

const Clusters = ({ data }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const clusterIcon = (cluster) => {
    let markers = cluster.getChildCount();
    return new L.DivIcon({
      html: "<div><span>" + markers.length + "</span></div>",
      className: "marker-cluster",
      iconSize: new L.Point(40, 40),
    });
  };

  const points = data.map((place) => ({
    type: "Feature",
    properties: {
      cluster: false,
      placeId: place.id,
      placeName: place.name,
    },
    geometry: {
      type: "Point",
      coordinates: [...place.geometry.coordinates],
    },
  }));

  return (
    <MarkerClusterGroup
      showCoverageOnHover={true}
      disableClusteringAtZoom={18}
      spiderfyOnMaxZoom={false}
      maxClusterRadius={45}
      defaultIconCreateFunction={(cluster) => clusterIcon(cluster)}
    >
      {points.map((point) => {
        const pos = [];

        if (Array.isArray(point.geometry.coordinates[0])) {
          pos.push(...point.geometry.coordinates[0]);
          let obj = {
            type: "Feature",
            properties: {
              cluster: false,
              placeId: point.properties.placeId,
              placeName: point.properties.name,
            },
            geometry: {
              type: "Point",
              coordinates: [...pos],
            },
          };

          return <></>;
        } else {
          pos.push(...point.geometry.coordinates.reverse());
        }

        return (
          <div key={`Place-${point.properties.placeId}`}>
            <Marker position={pos}>
              <Popup>
                <button className='popup-button' onClick={() => setShow(true)}>
                  More Info
                </button>
                <CustomModal
                  show={show}
                  onClose={handleClose}
                  id={point.properties.placeId}
                />
              </Popup>
            </Marker>
          </div>
        );
      })}
    </MarkerClusterGroup>
  );
};

export default Clusters;
