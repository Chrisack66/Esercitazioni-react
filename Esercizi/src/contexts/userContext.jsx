import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [db, setDb] = useState(JSON.parse(localStorage.getItem("users")) || []);
  function registrazione(formData) {
    setMessage("");
    const userExist = db.find(
      (x) => x.username === formData.username || x.email === formData.email
    );
    if (!userExist) {
      setMessage("Registrazione avvenuta con successo!");
      setDb((prev) => [...prev, formData]); // metto setUsers qui cosi che al click dell'handle registrazione mi carica user
    }
  }
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(db));
  }, [db]);

  function login(username, password) {
    setMessage("");
    const userExist = db.find(
      (x) => x.username === username && x.password === password
    );
    if (userExist) {
      setMessage("Login avvenuto con successo!");
      setUser(userExist);
      localStorage.setItem("user", JSON.stringify(userExist));
    } else {
      setMessage("Credenziali errate");
    }
  }
  function logout() {
    setMessage("");
    setUser(null);
    localStorage.removeItem("user");
  }
  function editUser(editUser) {
    const index = db.findIndex((x) => x.email === user.email);
    setDb(db.splice(index, 1, editUser));
    setUser(editUser); // modifica il nostro user
  }

  return (
    <UserContext.Provider
      value={{ db, registrazione, login, logout, message, user,editUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
