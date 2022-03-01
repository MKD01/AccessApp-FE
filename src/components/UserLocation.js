import React, { useCallback, useEffect, useState } from "react";
import { Circle, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import userIconImg from "../img/UserIcon.png";

const UserLocation = () => {
  const [zoom, setZoom] = useState(19);

  const pos = [53.4833, -2.24478];
  const map = useMap();

  const onZoom = useCallback(() => {
    setZoom(map.getZoom());
  }, [map]);

  useEffect(() => {
    map.on("zoom", onZoom);
  });

  const userLocationIcon = new L.Icon({
    iconURL: userIconImg,
    iconRetinaUrl: userIconImg,
    iconSize: [35, 45],
  });

  return zoom > 13 ? (
    <Marker
      eventHandlers={{
        click: () => {
          map.flyTo(pos, 19);
        },
      }}
      icon={userLocationIcon}
      position={pos}
    ></Marker>
  ) : (
    <></>
  );
};

export default UserLocation;
