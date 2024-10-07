import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User.js";
import { useNavigate } from "react-router-dom";
import mainLogo from "../../img/logo.png";
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
import Loader from "../Loader/Loader.jsx";

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { setUser, userList, isUserLoading } = useContext(UserContext);

  let navigate = useNavigate();

  const handleChange = (stateToUpdate, value) => {
    stateToUpdate(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValidUser = userList.some(
      (userList) => userList.username === usernameInput
    );

    if (isValidUser === false) {
      alert("Username does not exist, please try again");
      setPasswordInput("");
      return;
    }

    setUser(usernameInput);
    localStorage.setItem("username", usernameInput);
    setUsernameInput("");
    setPasswordInput("");
    navigate(`/map`);
  };

  if (isUserLoading) {
    return <Loader />;
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
                    value={usernameInput}
                    onChange={(e) =>
                      handleChange(setUsernameInput, e.target.value)
                    }
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
                    value={passwordInput}
                    onChange={(e) =>
                      handleChange(setPasswordInput, e.target.value)
                    }
                  />
                </Form.Label>
                <br></br>
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
