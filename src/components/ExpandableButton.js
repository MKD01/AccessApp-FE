import { useState } from "react";
import { Button } from "react-bootstrap";

const ExpandableButton = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => {
          setIsOpen((currentStatus) => {
            return !currentStatus;
          });
        }}
      >
        {isOpen ? "Close" : "Open"}
      </Button>
      {isOpen ? children : null}
    </>
  );
};

export default ExpandableButton;
