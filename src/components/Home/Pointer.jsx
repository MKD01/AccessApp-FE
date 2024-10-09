import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import CustomModal from "../Modal/CustomModal";

const Pointer = ({ point, map }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <Marker
      key={point.properties.placeId}
      className='marker'
      eventHandlers={{
        click: () => {
          map.flyTo([
            point.geometry.coordinates[1],
            point.geometry.coordinates[0],
          ]);
        },
      }}
      position={[point.geometry.coordinates[1], point.geometry.coordinates[0]]}
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
  );
};

export default Pointer;
