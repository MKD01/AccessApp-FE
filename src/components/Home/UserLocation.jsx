import { useCallback, useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import userIconImg from "../../img/UserIcon.png";
import UserLocationButtons from "./UserLocationButtons";

const UserLocation = ({ pos }) => {
  const [zoom, setZoom] = useState(19);
  const [showMyLocation, setShowMyLocation] = useState(true);

  const map = useMap();

  const onZoom = useCallback(() => {
    const curZoom = map.getZoom();
    setZoom(curZoom);
  }, [map]);

  useEffect(() => {
    map.on("zoom", onZoom);
  }, [onZoom, map]);

  const userLocationIcon = new L.Icon({
    iconUrl: userIconImg,
    iconRetinaUrl: userIconImg,
    iconSize: [30, 43],
  });

  return (
    <>
      {zoom > 13 && showMyLocation && (
        <Marker
          eventHandlers={{
            click: () => {
              map.flyTo(pos, 19);
            },
          }}
          icon={userLocationIcon}
          position={pos}
        >
          <Popup>Your Location</Popup>
        </Marker>
      )}
      <UserLocationButtons pos={pos} setShowMyLocation={setShowMyLocation} />
    </>
  );
};

export default UserLocation;
