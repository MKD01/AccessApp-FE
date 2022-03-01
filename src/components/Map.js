import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import geoJsonData from "../data/manchesterSmallData.json";
import { UserContext } from "../contexts/User.js";
import NotLoggedInError from "./NotLoggedInError";
import Search from "./Search";
import PointsCluster from "./PointsCluster";
import { CoordinatesRefactoring } from "../utils/DataRefactoring";
import UserLocation from "./UserLocation";
import UserLocationButtons from "./UserLocationButtons";

function MainMap() {
  const [userLocationVisibility, setUserLocationVisibility] = useState(true);
  const [searchResult, setSearchResult] = useState("");

  const userPos = [53.4833, -2.24478];

  console.log(searchResult);

  const { isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  const points = geoJsonData.features.map((place) => {
    return {
      type: "Feature",
      properties: {
        cluster: false,
        placeId: place.id,
        placeName: place.properties.name,
      },
      geometry: {
        type: "Point",
        coordinates: CoordinatesRefactoring(place.geometry.coordinates),
      },
    };
  });

  if (isLoggedIn === true || LoggedInCheck === true) {
    return (
      <>
        <Search setSearchResult={setSearchResult} />

        <MapContainer
          className='leaflet-container'
          center={[53.483959, -2.244644]}
          zoom={19}
          maxZoom={20}
        >
          <TileLayer
            maxNativeZoom={19}
            maxZoom={20}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <UserLocationButtons
            pos={userPos}
            setUserLocationVisibility={setUserLocationVisibility}
          />
          {userLocationVisibility ? <UserLocation pos={userPos} /> : <></>}
          <PointsCluster points={points} searchResult={searchResult} />
        </MapContainer>
      </>
    );
  } else {
    return (
      <>
        <NotLoggedInError />
      </>
    );
  }
}

export default MainMap;
