import { useEffect, useContext, useState } from "react";
import { UserContext } from "../contexts/User.js";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../utils/be-api.js";
import mainLogo from "../img/logo.png";
import {
  FormControl,
  Button,
  InputGroup,
  Card,
  Form,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

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
    <div className='loginPage'>
      <main>
        <Card className='login-card'>
          <ModalHeader className='login-header'>
            <ModalTitle>
              <h2>LOGIN</h2>
            </ModalTitle>
            <br />
          </ModalHeader>
          <Form className='Login__form' onSubmit={handleSubmit}>
            <Form.Group className='mb-3' id='login-form'>
              <InputGroup className='mb-3'>
                <Form.Label htmlFor='Login__textbox'>
                  Username:
                  <FormControl
                    type='text'
                    aria-describedby='basic-addon2'
                    name='Login__textbox'
                    id='Login__textbox'
                    value={newUsername}
                    onChange={handleUsernameChange}
                    placeholder='Enter Username'
                    required
                  />
                </Form.Label>
                <Form.Label className='password-box' htmlFor='Login__textbox'>
                  Password:
                  <FormControl
                    type='password'
                    aria-describedby='basic-addon2'
                    name='Login__textbox'
                    placeholder='Enter Password'
                    required
                  />
                </Form.Label>
                <br></br>
              </InputGroup>
              <Button variant='secondary' type='submit'>
                Log in
              </Button>
            </Form.Group>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default Login;
