import { Button } from "react-bootstrap";

const ExpandableButton = ({ isOpen, setIsOpen, children }) => {
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
