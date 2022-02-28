import React, { useState, useContext } from "react";
import { postCommentToVenueById } from "../utils/be-api.js";
import { UserContext } from "../contexts/User";
import NotLoggedInError from "./NotLoggedInError.js";

const CreateNewComment = ({ id, setComments }) => {
  const [newComment, setNewComment] = useState("");
  const { isLoggedIn } = useContext(UserContext);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const username = JSON.parse(localStorage.getItem("username"));
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCommentDetail = {
      author: username,
      body: newComment,
      total_confirmed_votes: 0,
    };

    postCommentToVenueById(id, newCommentDetail).then(() => {
      setNewComment("");
    });
  };

  if (isLoggedIn === true || LoggedInCheck === true) {
    return (
      <>
        <div className="commentBox" onSubmit={handleSubmit}>
          <form>
            <label htmlFor="commentBox"></label>
            <input
              type="text"
              id="commentBox"
              name="commentBox"
              placeholder="Type your comment here..."
              value={newComment}
              onChange={handleCommentChange}
              required
            ></input>
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <NotLoggedInError />
      </>
    );
  }
};

export default CreateNewComment;
