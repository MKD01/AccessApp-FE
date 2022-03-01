import React from "react";
import { useMap } from "react-leaflet";

const UserLocationButtons = ({ pos, setUserLocationVisibility }) => {
  const handleUserLocationVisibility = () => {
    setUserLocationVisibility((currVisibility) => !currVisibility);
  };

  const map = useMap();

  const HandleUserLocation = () => {
    map.flyTo(pos, 19);
  };

  return (
    <div className='user-location-buttons'>
      <button onClick={HandleUserLocation}>My Location</button>
      <button onClick={handleUserLocationVisibility}>Hide My Location</button>
    </div>
  );
};

export default UserLocationButtons;
