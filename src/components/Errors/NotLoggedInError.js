import Alert from "react-bootstrap/Alert";

const NotLoggedInError = () => {
  return (
    <>
      <br></br>
      <Alert variant="danger">
        <center>
          <br></br>
          Error - You need to be logged in to access this page!
          <br></br>
          <br></br>
          <Alert.Link href="/">Click here to go to the Login screen</Alert.Link>
        </center>
      </Alert>
    </>
  );
};

export default NotLoggedInError;
