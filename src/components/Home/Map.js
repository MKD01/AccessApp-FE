import { useContext, useState } from "react";
import Footer from "../Layout/Footer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { MapContainer, TileLayer } from "react-leaflet";
import geoJsonData from "../../data/manchesterSmallData.json";
import { UserContext } from "../../contexts/User.js";
import NotLoggedInError from "../Errors/NotLoggedInError.js";
import Search from "./Search.js";
import PointsCluster from "./PointsCluster.js";
import { CoordinatesRefactoring } from "../../utils/DataRefactoring.js";
import UserLocation from "./UserLocation.js";
import UserLocationButtons from "./UserLocationButtons.js";
import { SyncLoader } from "react-spinners";

function MainMap() {
  const [userLocationVisibility, setUserLocationVisibility] = useState(true);
  const [searchResult, setSearchResult] = useState("");

  const userPos = [53.4833, -2.24478];

  const { user, isUserLoading } = useContext(UserContext);

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

  if (isUserLoading) {
    return <SyncLoader />;
  }

  if (!user) {
    return <NotLoggedInError />;
  }

  return (
    <>
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
        <Search className='searchbar' setSearchResult={setSearchResult} />
        <UserLocationButtons
          pos={userPos}
          setUserLocationVisibility={setUserLocationVisibility}
        />
        {userLocationVisibility ? <UserLocation pos={userPos} /> : <></>}
        <PointsCluster points={points} searchResult={searchResult} />
        <Footer />
      </MapContainer>
    </>
  );
}

export default MainMap;
