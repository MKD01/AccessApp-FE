import { Card, ListGroup } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Card id='footer' style={{ width: "9.5rem" }}>
        <ListGroup variant='flush'>
          <ListGroup.Item>© 2022 The Reactors</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default Footer;
