import axios from "axios";

// API query for app Backend
const BEapi = axios.create({
  baseURL: "https://accessapp-be.herokuapp.com/api/",
});

// GET Requests
export const getVenueInfoById = (id) => {
  return BEapi.get(`accessinfo/${id}`).then((res) => {
    return res.data;
  });
};

export const getUsers = () => {
  return BEapi.get(`users/`).then((res) => {
    return res.data;
  });
};

// PATCH Requests
export const postCommentToVenueById = (id, newCommentDetail) => {
  const { author, body, total_confirmed_votes } = newCommentDetail;
  return BEapi.patch(`accessinfo/${id}`, {
    comments: {
      author: author,
      body: body,
      total_confirmed_votes: total_confirmed_votes,
    },
  });
};
