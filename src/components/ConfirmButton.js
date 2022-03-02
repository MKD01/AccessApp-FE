import { useState } from "react";
import Button from "react-bootstrap/Button";

const ConfirmButton = ({ total_confirmed_votes, setConfirmCount, id }) => {
  const [disableButton, setDisableButton] = useState(false);
  const [disabledButtonText, setDisabledButtonText] = useState(
    `👍 Confirm this? (${total_confirmed_votes} votes)`
  );

  return (
    <>
      <Button
        disabled={disableButton}
        variant='outline-dark'
        onClick={() => {
          setDisabledButtonText(
            `Comment confirmed (${total_confirmed_votes + 1} votes)`
          );
          setConfirmCount((currVal) => {
            const obj = { ...currVal };
            obj[id] = 1;
            console.log(obj);
            return obj;
          });
          setDisableButton(true);
        }}
      >
        {disabledButtonText}
      </Button>
    </>
  );
};

export default ConfirmButton;
