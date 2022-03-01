import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User.js";
import { Navbar, Container, Button } from "react-bootstrap";
import mainLogo from "../img/logo.png";

const Nav = () => {
  const { setLoggedInUser, isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));
  const username = JSON.parse(localStorage.getItem("username"));

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    setLoggedInUser({ username: undefined });
    alert("You are now logged out.");
    routeChange("/");
  };

  if (isLoggedIn === true || LoggedInCheck === true) {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={mainLogo}
                width="50"
                height="50"
                className="d-inline-block align-top"
              />{" "}
              Inclusive Manchester
            </Navbar.Brand>
            <Navbar.Text>Hi, {username}!</Navbar.Text>
            <Button variant="secondary" onClick={() => handleLogout()}>
              Logout
            </Button>
          </Container>
        </Navbar>
      </>
    );
  } else {
    return (
      <>
        <h1>App logo and name here</h1>
      </>
    );
  }
};

export default Nav;
