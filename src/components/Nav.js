import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User.js";

const Nav = () => {
  const { setLoggedInUser, isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

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
        <h1>App logo and name here</h1>
        <button onClick={() => handleLogout()}>Log out</button>
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
