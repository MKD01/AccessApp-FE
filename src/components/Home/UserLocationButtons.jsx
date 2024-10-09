import { Button } from "react-bootstrap";
import React from "react";
import { useMap } from "react-leaflet";

const UserLocationButtons = ({ pos, setShowMyLocation }) => {
  const handleUserLocationVisibility = () => {
    setShowMyLocation((currVal) => !currVal);
  };

  const map = useMap();

  const HandleUserLocation = () => {
    map.flyTo(pos, 19);
  };

  return (
    <div className='user-location-buttons'>
      <Button
        className='location-button'
        variant='light'
        onClick={HandleUserLocation}
        data-toggle='tooltip'
        data-placement='left'
        title='Go To My Location'
      >
        <i className='bi bi-crosshair'></i>
      </Button>
      <Button
        className='location-button'
        variant='light'
        onClick={handleUserLocationVisibility}
        data-toggle='tooltip'
        data-placement='left'
        title='Show/Hide My Location'
      >
        <i className='bi bi-pin-map'></i>
      </Button>
    </div>
  );
};

export default UserLocationButtons;
