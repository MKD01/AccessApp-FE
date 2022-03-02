import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import { UserContext } from "../contexts/User.js";

const ErrorPage = () => {
  const { isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  if (isLoggedIn === true || LoggedInCheck === true) {
    return (
      <>
        <br></br>
        <Alert variant="danger">
          <center>
            Status 404
            <br></br>
            <br></br>
            Error - This page does not exist!
            <br></br>
            <br></br>
            <Alert.Link href="/map">
              Click here to go back to The Map
            </Alert.Link>
          </center>
        </Alert>
      </>
    );
  } else {
    return (
      <>
        <br></br>
        <Alert variant="danger">
          <center>
            Status 404
            <br></br>
            <br></br>
            Error - This page does not exist!
            <br></br>
            <br></br>
            <Alert.Link href="/">
              Click here to go to the Login screen
            </Alert.Link>
          </center>
        </Alert>
      </>
    );
  }
};

export default ErrorPage;
