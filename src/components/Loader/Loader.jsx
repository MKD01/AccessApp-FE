import React, { useContext, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { UserContext } from "../../contexts/User";

const Loader = () => {
  const [message, setMessage] = useState("");
  const { isUserLoading } = useContext(UserContext);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setMessage(
        "The app can take up to 50 seconds to load as the backend api is hosted on the free tier of render"
      );
    }, 2000);

    if (!isUserLoading) {
      clearTimeout(timeoutID);
    }

    return () => {
      clearTimeout(timeoutID);
    };
  }, [isUserLoading]);

  return (
    <div id='loader-container'>
      <div id='loader-message-container'> {message && <p>{message}</p>}</div>

      <SyncLoader />
    </div>
  );
};

export default Loader;
