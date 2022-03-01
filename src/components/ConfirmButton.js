import { useState } from "react";

const ConfirmButton = ({ total_confirmed_votes }) => {
  const [disableButton, setDisableButton] = useState(false);
  const [disabledButtonText, setDisabledButtonText] = useState(
    `👍 Confirm this? (${total_confirmed_votes} votes)`
  );

  return (
    <>
      <button
        disabled={disableButton}
        onClick={() => {
          setDisabledButtonText(
            `Comment confirmed (${total_confirmed_votes + 1} votes)`
          );
          setDisableButton(true);
        }}
      >
        {disabledButtonText}
      </button>
      ;
    </>
  );
};

export default ConfirmButton;
