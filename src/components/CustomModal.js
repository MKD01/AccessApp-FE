import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { getVenueInfoById } from "../utils/be-api.js";
import CreateNewComment from "./CreateNewComment.js";
import LoadingSpin from "./LoadingSpin.js";
import ConfirmButton from "./ConfirmButton.js";

const CustomModal = ({ show, onClose, id }) => {
  const [venueItems, setVenueItems] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const setId = (id) => {
    const splitId = id.split("/");
    return splitId[1];
  };

  console.log(setId(id), "id");

  useEffect(() => {
    getVenueInfoById(setId(id)).then((res) => {
      setVenueItems(res);
      setIsLoading(false);
    });
  }, [venueItems, id]);

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

  return isLoading ? (
    <LoadingSpin />
  ) : (
    <Modal show={show} onHide={onClose} centered size='lg'>
      <ModalHeader closeButton>
        <ModalTitle>{venueItems.name}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <h2>
          {venueItems.name} ({venueItems._id})
        </h2>
        <h3>Have an address here?</h3>
        <p>{"Wheelchair access: " + venueItems.wheelchair}</p>
        <p>
          {"Access Description: " + venueItems.wheelchairDesc}{" "}
          <button>Click to change</button>
        </p>
        <p>
          Average accessibility rating (Out of 5):{" "}
          {average(venueItems.accessibility_ratings)}
        </p>
        <hr></hr>
        <p>
          <strong>Comments about accessibility:</strong>
        </p>
        <ul>
          {venueItems.comments.map((comments) => {
            return (
              <>
                <li key={comments._id}>
                  {comments.body}
                  <br></br>
                  Author: {comments.author} | Posted:{" "}
                  {moment(comments.commentDate).format("MMM Do YY")}
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
          <b>Please leave a comment on how accessible this venue was: </b>
        </p>
        <CreateNewComment id={setId(id)} />
      </ModalBody>
      <ModalFooter>
        <Button variant='primary' onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
