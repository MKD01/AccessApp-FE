import React, { useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import CustomModal from "./CustomModal";
import Button from "react-bootstrap/Button";
import L from "leaflet";

const PointsCluster = ({ points, searchResult }) => {
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
  const map = useMap();
  return (
    <MarkerClusterGroup
      showCoverageOnHover={true}
      disableClusteringAtZoom={18}
      spiderfyOnMaxZoom={false}
      maxClusterRadius={45}
      defaultIconCreateFunction={(cluster) => clusterIcon(cluster)}
    >
      <div>
        {points.map((point) => {
          return searchResult ? (
            point.properties.placeName === searchResult ? (
              <div key={point.properties.placeId}>
                <Marker
                  className='marker'
                  eventHandlers={{
                    click: () => {
                      console.log("here");
                      map.flyTo([
                        point.geometry.coordinates[1],
                        point.geometry.coordinates[0],
                      ]);
                    },
                  }}
                  position={[
                    point.geometry.coordinates[1],
                    point.geometry.coordinates[0],
                  ]}
                >
                  <Popup>
                    <h4>
                      {point.properties.placeName
                        ? point.properties.placeName
                        : "No Name Found"}
                    </h4>
                    <Button variant='secondary' onClick={() => setShow(true)}>
                      Click for more info
                    </Button>
                    <CustomModal
                      show={show}
                      handleClose={handleClose}
                      id={point.properties.placeId}
                    />
                  </Popup>
                </Marker>
              </div>
            ) : (
              <></>
            )
          ) : (
            <div key={point.properties.placeId}>
              <Marker
                eventHandlers={{
                  click: () => {
                    console.log("here");
                    map.flyTo([
                      point.geometry.coordinates[1],
                      point.geometry.coordinates[0],
                    ]);
                  },
                }}
                position={[
                  point.geometry.coordinates[1],
                  point.geometry.coordinates[0],
                ]}
              >
                <Popup>
                  <h4>
                    {point.properties.placeName
                      ? point.properties.placeName
                      : "No Name Found"}
                  </h4>
                  <br></br>
                  <Button variant='secondary' onClick={() => setShow(true)}>
                    Click for more info
                  </Button>
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
