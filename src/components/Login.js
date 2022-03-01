import { useEffect, useContext, useState } from "react";
import { UserContext } from "../contexts/User.js";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../utils/be-api.js";
import mainLogo from "../img/logo.png";

const Login = () => {
  const [newUsername, setNewUsername] = useState("");
  const [userList, setUserList] = useState([]);
  const { setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    getUsers().then((data) => {
      setUserList(data);
    });
  }, []);

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const checkUsername = (userList) => userList.username === newUsername;

    if (userList.some(checkUsername) === true) {
      userList.forEach((eachUser) => {
        if (eachUser.username === newUsername) {
          setLoggedInUser({ username: newUsername });
          localStorage.setItem("username", JSON.stringify(newUsername));
          localStorage.setItem("isLoggedIn", true);
          setNewUsername("");
          routeChange(`/map`);
        }
      });
    } else {
      alert("Username does not exist, please try again");
    }
  };

  return (
    <div className="loginPage">
      <main>
        <br></br>
        <img src={mainLogo} alt="Inclusive Manchester logo" height="300"></img>
        <p>
          For Demo purposes - Please log in as: <strong>joe</strong>
        </p>
        <form className="Login__form" onSubmit={handleSubmit}>
          <label htmlFor="Login__textbox">
            <input
              type="text"
              name="Login__textbox"
              id="Login__textbox"
              value={newUsername}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              required
            />
          </label>
          <br></br>
          <button type="submit">Log in</button>
        </form>
      </main>
    </div>
  );
};

export default Login;
