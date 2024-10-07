import { createContext, useEffect, useState } from "react";
import { getUsers } from "../utils/be-api";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState("");
  const [userList, setUserList] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const localStorageUsername = localStorage.getItem("username");

    if (localStorageUsername) {
      setUser(localStorageUsername);
    }

    setIsUserLoading(true);

    getUsers().then((data) => {
      setUserList(data);
      setIsUserLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isUserLoading, userList }}>
      {props.children}
    </UserContext.Provider>
  );
};
