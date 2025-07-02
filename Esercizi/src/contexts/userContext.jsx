import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [db, setDb] = useState(JSON.parse(localStorage.getItem("users")) || []);
  return <UserContext.Provider>{children}</UserContext.Provider>;
};
