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
  Alert,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { SyncLoader } from "react-spinners";

const Login = () => {
  const [newUsername, setNewUsername] = useState("");
  const [userList, setUserList] = useState([]);
  const { setLoggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then((data) => {
      setUserList(data);
      setIsLoading(false);
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

  if (isLoading) {
    return <SyncLoader />;
  }

  return (
    <div className='loginPage'>
      <main>
        <center>
          <img
            src={mainLogo}
            alt='Inclusive Manchester'
            width='300'
            height='300'
          ></img>
        </center>
        <Alert variant='info'>
          <b>Demo: </b>For demo purposes please log in as <strong>joe</strong>{" "}
          with password <strong>admin</strong>.
        </Alert>
        <Card className='login-card'>
          <ModalHeader className='login-header'>
            <ModalTitle>
              <h2>LOGIN</h2>
            </ModalTitle>
            <br />
          </ModalHeader>
          <Form className='Login__form' onSubmit={handleSubmit}>
            <Form.Group className='mb-3' id='login-form'>
              <InputGroup id='login-content' className='mb-3'>
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
                <br></br>{" "}
                <Button variant='secondary' type='submit'>
                  Log in
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default Login;
