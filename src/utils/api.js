import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const getPlaces = (typeId) => {
  const url = `https://api.openstreetmap.org/api/0.6/${typeId}`;

  const { data, error } = useSWR(url, { fetcher });
  const places = data && !error ? data : [];

  return places;
};
