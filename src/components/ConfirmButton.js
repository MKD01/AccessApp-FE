const ConfirmButton = ({ total_confirmed_votes, id }) => {
  return (
    <>
      <button>👍 Confirmed: ({total_confirmed_votes})</button>;
    </>
  );
};

export default ConfirmButton;
