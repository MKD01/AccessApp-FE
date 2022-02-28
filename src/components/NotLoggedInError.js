import { Link } from "react-router-dom";

const NotLoggedInError = () => {
  return (
    <>
      <p>You are not logged in</p>
      <br></br>
      <Link to="/">Click here to go back to the Login page</Link>
    </>
  );
};

export default NotLoggedInError;
