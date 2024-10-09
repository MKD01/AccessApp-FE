import { ListGroup } from "react-bootstrap";

const ModalRatings = ({ venueInfo }) => {
  console.log(venueInfo);

  const getAverage = (allRatings) => {
    const totalRatings = allRatings.reduce((acc, rating) => {
      return acc + rating;
    });

    const rating = Math.round(totalRatings / allRatings.length);
    const ratingsArr = ["★", "★", "★", "★", "★"];

    return ratingsArr.fill("⭐️", 0, rating).join("");
  };

  if (!venueInfo.accessibility_ratings.length) {
    return (
      <p>
        <strong>
          There are no ratings to show you yet, be the first by reviewing this
          venue below.
        </strong>
      </p>
    );
  }
  return (
    <ListGroup>
      <ListGroup.Item variant='dark'>
        <strong>Average General Accessibility rating: </strong>
        <br></br>
        {getAverage(venueInfo.accessibility_ratings)}
      </ListGroup.Item>
      <br></br>
      <ListGroup.Item variant='dark'>
        <strong>Average Equality rating: </strong>
        <br></br>
        {getAverage(venueInfo.equality_ratings)}
      </ListGroup.Item>
      <br></br>
      <ListGroup.Item variant='dark'>
        <strong>Average Attitude rating: </strong>
        <br></br>
        {getAverage(venueInfo.attitude_ratings)}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ModalRatings;
