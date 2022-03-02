import { useState } from "react";
import Button from "react-bootstrap/Button";

const ConfirmButton = ({ total_confirmed_votes }) => {
  const [disableButton, setDisableButton] = useState(false);
  const [disabledButtonText, setDisabledButtonText] = useState(
    `👍 Confirm this? (${total_confirmed_votes} votes)`
  );

  return (
    <>
      <Button
        disabled={disableButton}
        variant="outline-dark"
        onClick={() => {
          setDisabledButtonText(
            `Comment confirmed (${total_confirmed_votes + 1} votes)`
          );
          setDisableButton(true);
        }}
      >
        {disabledButtonText}
      </Button>
    </>
  );
};

export default ConfirmButton;
