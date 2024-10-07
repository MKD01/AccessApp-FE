import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/User";
import { Navbar, Container, Button } from "react-bootstrap";
import mainLogo from "../../img/logo.png";

const Nav = () => {
  const { setUser, user } = useContext(UserContext);

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUser("");
    routeChange("/");
    alert("You are now logged out.");
  };

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>
            <img
              alt=''
              src={mainLogo}
              width='50'
              height='50'
              className='d-inline-block align-top'
            />
            Inclusive Manchester
          </Navbar.Brand>
          {user && (
            <>
              <Navbar.Text>Hi, {user}!</Navbar.Text>
              <Button variant='secondary' onClick={() => handleLogout()}>
                Logout
              </Button>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Nav;
