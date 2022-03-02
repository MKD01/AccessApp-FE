import { Button } from "react-bootstrap";
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
      <Button
        className='show-hide-location'
        variant='light'
        onClick={HandleUserLocation}
      >
        📍
      </Button>
      <Button
        className='show-hide-location'
        variant='light'
        onClick={handleUserLocationVisibility}
      >
        📌
      </Button>
    </div>
  );
};

export default UserLocationButtons;
