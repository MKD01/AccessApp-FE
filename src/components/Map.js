import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MapContainer, TileLayer } from "react-leaflet";
import geoJsonData from "../data/manchesterBigData.json";
import Clusters from "./Clusters";
import { UserContext } from "../contexts/User.js";
import NotLoggedInError from "./NotLoggedInError";
import Search from "./Search";

function MainMap() {
  const [searchResult, setSearchResult] = useState("");

  console.log(searchResult);

  const { isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  const onEachNode = (node, layer) => {
    const nodeName = node.properties.name;

    layer.bindPopup((nodeName || "Not found") + " ");
  };

  if (isLoggedIn === true || LoggedInCheck === true) {
    return (
      <>
        <Search setSearchResult={setSearchResult} />
        <MapContainer
          className='leaflet-container'
          center={[53.483959, -2.244644]}
          zoom={18}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Clusters data={geoJsonData.features} searchResult={searchResult} />
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
