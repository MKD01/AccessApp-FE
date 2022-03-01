import { useState } from "react";

const ExpandableButton = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen((currentStatus) => {
            return !currentStatus;
          });
        }}
      >
        {isOpen ? "Close" : "Open"}
      </button>
      {isOpen ? children : null}
    </>
  );
};

export default ExpandableButton;
