import { useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import Pointer from "./Pointer";

const PointsCluster = ({ points }) => {
  const map = useMap();

  const clusterIcon = (cluster) => {
    const markers = cluster.getChildCount();

    return new L.DivIcon({
      html: "<div><span>" + markers.length + "</span></div>",
      className: "marker-cluster",
      iconSize: new L.Point(40, 40),
    });
  };

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
          return <Pointer point={point} map={map} />;
        })}
      </div>
    </MarkerClusterGroup>
  );
};

export default PointsCluster;
