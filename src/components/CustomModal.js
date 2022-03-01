import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import moment from "moment";
import {
  getVenueInfoById,
  patchAccessRatingById,
  patchEqualityRatingById,
  patchAttitudeRatingById,
  postCommentToVenueById,
} from "../utils/be-api.js";
import LoadingSpin from "./LoadingSpin.js";
import ConfirmButton from "./ConfirmButton.js";
import ExpandableButton from "./ExpandableButton.js";

const CustomModal = ({ show, handleClose, id }) => {
  const [venueItems, setVenueItems] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  // user context
  const username = JSON.parse(localStorage.getItem("username"));

  // states for radio buttons
  const [accessState, setAccessState] = useState(null);
  const [equalityState, setEqualityState] = useState(null);
  const [attitudeState, setAttitudeState] = useState(null);

  console.log(id, "incoming ID");

  const setId = (id) => {
    const splitId = id.split("/");
    return splitId[1];
  };

  console.log(setId(id), "id");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
    console.log(event.target.value);
  };

  const handleAccessRadioSelect = (event) => {
    setAccessState(event.target.value);
  };
  const handleEqualityRadioSelect = (event) => {
    setEqualityState(event.target.value);
  };
  const handleAttitudeRadioSelect = (event) => {
    setAttitudeState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const accessRating = { accessibility_ratings: accessState };
    const equalityRating = { equality_ratings: equalityState };
    const attitudeRating = { attitude_ratings: attitudeState };
    const commentForSubmit = {
      author: username,
      body: newComment,
      total_confirmed_votes: 0,
    };
    patchAccessRatingById(setId(id), accessRating).then(() => {
      patchEqualityRatingById(setId(id), equalityRating).then(() => {
        patchAttitudeRatingById(setId(id), attitudeRating).then(() => {
          postCommentToVenueById(setId(id), commentForSubmit).then(() => {
            setAccessState(null);
            setEqualityState(null);
            setAttitudeState(null);
            setNewComment("");
          });
        });
      });
    });
  };

  useEffect(() => {
    getVenueInfoById(setId(id)).then((res) => {
      setVenueItems(res);
      setIsLoading(false);
    });
  }, [id]);

  function average(array) {
    let total = 0;
    let count = 0;

    array.forEach(function (item, index) {
      total += item;
      count++;
    });

    let final = Math.round(total / count);

    if (final === 5) {
      return "⭐️⭐️⭐️⭐️⭐️";
    } else if (final === 4) {
      return "⭐️⭐️⭐️⭐️★";
    } else if (final === 3) {
      return "⭐️⭐️⭐️★★";
    } else if (final === 2) {
      return "⭐️⭐️★★★";
    } else if (final === 1) {
      return "⭐️★★★★";
    } else if (final === 0) {
      return "★★★★★";
    }
  }

  function accessSwitch(accessStatement) {
    switch (accessStatement) {
      case "Yes":
        return (
          <>
            <p>
              OpenStreetMap data suggests {venueItems.name || "this location"}{" "}
              has good accessibility for users with mobility issues.
            </p>
            <p>OSM description: {venueItems.wheelchairDesc}</p>
          </>
        );
      case "Limited":
        return (
          <p>
            OpenStreetMap data suggests {venueItems.name || "this location"} has
            limited accessibility for users with mobility issues.
          </p>
        );
      case "No":
        return (
          <p>
            OpenStreetMap data suggests {venueItems.name || "this location"} has
            no accessibility for users with mobility issues.
          </p>
        );
      default:
        return (
          <p>
            OpenStreetMap data suggests {venueItems.name || "this location"} has
            no accessibility for users with mobility issues.
          </p>
        );
    }
  }

  return isLoading ? (
    <LoadingSpin />
  ) : (
    <Modal
      show={show}
      onHide={() => {
        setIsLoading(true);
        handleClose();
      }}
      centered
      size="lg"
    >
      <ModalHeader closeButton>
        <ModalTitle>
          <h2>{venueItems.name}</h2>
        </ModalTitle>{" "}
        <br />
      </ModalHeader>
      <ModalBody>
        {console.log(venueItems, "venue items")}

        <h4>At a glance:</h4>
        {accessSwitch(venueItems.wheelchair)}
        <p>
          Average General Accessibility rating:{" "}
          {average(venueItems.accessibility_ratings)}
          <br />
          Average Equality rating: {average(venueItems.equality_ratings)}
          <br />
          Average Attitude rating: {average(venueItems.attitude_ratings)}
        </p>
        <hr></hr>
        <p>
          <strong>Comments about {venueItems.name || "this location"}:</strong>
        </p>
        <ul>
          {venueItems.comments.map((comments) => {
            return (
              <>
                <li key={comments._id}>
                  {comments.body}
                  <br></br>
                  Author: {comments.author} | Posted:{" "}
                  {moment(comments.commentDate).format("MMM Do YYYY")}
                  <br></br>
                  <ConfirmButton
                    total_confirmed_votes={comments.total_confirmed_votes}
                    id={venueItems._Id}
                  />
                </li>
                <br></br>
              </>
            );
          })}
        </ul>
        <hr></hr>
        <p>
          <b>
            Please add to our information for{" "}
            {venueItems.name || "this location"}:{" "}
          </b>
        </p>
        <ExpandableButton>
          <div onSubmit={handleSubmit}>
            <form>
              <br />
              <p>
                <strong>How accessible is this location?</strong>
                <br />
                Does this location have accessible facilites? e.g. flat
                entrances and disabled bathrooms?
                <br />
                Is there furniture suitable to meet specific individual need?{" "}
                <br />
                Is there adequate space between furniture? I.e. are there
                suitable turning circles?
              </p>
              <p>Please give a rating for general accessibility</p>
              <label htmlFor="accessRadioButton1">
                <input
                  type="radio"
                  id="accessRadioButton1"
                  name="accessRating"
                  value={1}
                  onChange={handleAccessRadioSelect}
                />{" "}
                Very Poor
              </label>
              <br />
              <label htmlFor="accessRadioButton2">
                <input
                  type="radio"
                  id="accessRadioButton2"
                  name="accessRating"
                  value={2}
                  onChange={handleAccessRadioSelect}
                />{" "}
                Poor
              </label>
              <br />
              <label htmlFor="accessRadioButton3">
                <input
                  type="radio"
                  id="accessRadioButton3"
                  name="accessRating"
                  value={3}
                  onChange={handleAccessRadioSelect}
                />{" "}
                Average
              </label>
              <br />
              <label htmlFor="accessRadioButton4">
                <input
                  type="radio"
                  id="accessRadioButton4"
                  name="accessRating"
                  value={4}
                  onChange={handleAccessRadioSelect}
                />{" "}
                Good
              </label>
              <br />
              <label htmlFor="accessRadioButton5">
                <input
                  type="radio"
                  id="accessRadioButton5"
                  name="accessRating"
                  value={5}
                  onChange={handleAccessRadioSelect}
                />{" "}
                Very Good
              </label>
              <br />
              <br />
              <p>
                <strong>
                  How equal were you made to feel at this location?
                </strong>
                <br />
                Are disabled facilities at this location utilised
                inappropiately? I.e toilets/changing places being used as
                storage.
                <br />
                Are reasonable adjustments made to individual need?
                <br />
                Are there alternative forms of communication available at this
                location? E.g. BSL/ Braille/ hearing loops etc.
              </p>
              <div>
                <p>Please give a rating for equality:</p>
                <label htmlFor="equalityRadioButton1">
                  <input
                    type="radio"
                    id="equalityRadioButton1"
                    name="equalityRating"
                    value={1}
                    onChange={handleEqualityRadioSelect}
                  />{" "}
                  Very Poor
                </label>
                <br />
                <label htmlFor="equalityRadioButton2">
                  <input
                    type="radio"
                    id="equalityRadioButton2"
                    name="equalityRating"
                    value={2}
                    onChange={handleEqualityRadioSelect}
                  />{" "}
                  Poor
                </label>
                <br />
                <label htmlFor="equalityRadioButton3">
                  <input
                    type="radio"
                    id="equalityRadioButton3"
                    name="equalityRating"
                    value={3}
                    onChange={handleEqualityRadioSelect}
                  />{" "}
                  Average
                </label>
                <br />
                <label htmlFor="equalityRadioButton4">
                  <input
                    type="radio"
                    id="equalityRadioButton4"
                    name="equalityRating"
                    value={4}
                    onChange={handleEqualityRadioSelect}
                  />{" "}
                  Good
                </label>
                <br />
                <label htmlFor="equalityRadioButton5">
                  <input
                    type="radio"
                    id="equalityRadioButton5"
                    name="equalityRating"
                    value={5}
                    onChange={handleEqualityRadioSelect}
                  />{" "}
                  Very Good
                </label>
                <br />
                <br />
                <p>
                  <strong>
                    What was the attitude of the staff/clientele at this
                    location?
                  </strong>
                  <br />
                  Did this location provide an inclusive atmosphere? I.e. did
                  staff and clientele make you feel welcome?
                  <br />
                  Did everbody at this location treat you respectfully? E.g.
                  addressing you rather than your carer?
                  <br />
                  Did you feel that staff had appropriate Equality and Diversity
                  traning?
                </p>
                <div>
                  <p>Please give a rating for attitudes:</p>
                  <label htmlFor="attitudeRadioButton1">
                    <input
                      type="radio"
                      id="attitudeRadioButton1"
                      name="attitudeRating"
                      value={1}
                      onChange={handleAttitudeRadioSelect}
                    />{" "}
                    Very Poor
                  </label>
                  <br />
                  <label htmlFor="attitudeRadioButton2">
                    <input
                      type="radio"
                      id="attitudeRadioButton2"
                      name="attitudeRating"
                      value={2}
                      onChange={handleAttitudeRadioSelect}
                    />{" "}
                    Poor
                  </label>
                  <br />
                  <label htmlFor="attitudeRadioButton3">
                    <input
                      type="radio"
                      id="attitudeRadioButton3"
                      name="attitudeRating"
                      value={3}
                      onChange={handleAttitudeRadioSelect}
                    />{" "}
                    Average
                  </label>
                  <br />
                  <label htmlFor="attitudeRadioButton4">
                    <input
                      type="radio"
                      id="attitudeRadioButton4"
                      name="attitudeRating"
                      value={4}
                      onChange={handleAttitudeRadioSelect}
                    />{" "}
                    Good
                  </label>
                  <br />
                  <label htmlFor="attitudeRadioButton5">
                    <input
                      type="radio"
                      id="attitudeRadioButton5"
                      name="attitudeRating"
                      value={5}
                      onChange={handleAttitudeRadioSelect}
                    />{" "}
                    Very Good
                  </label>
                </div>
                <br />
                <strong>Comments</strong>
                <p>Please expand on your experiences here:</p>

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
              </div>
            </form>
          </div>
        </ExpandableButton>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="primary"
          onClick={() => {
            setIsLoading(true);
            handleClose();
          }}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
