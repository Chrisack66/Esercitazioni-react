import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

// hook personalizzato che usa il contesto, così da non dover importare il contesto in ogni file.
export const useUser = () => useContext(UserContext);

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
    const copiaDatabase = [...db];
    copiaDatabase.splice(index, 1, editUser); //splice modifica l'array originale, ma a noi interessa un nuovo database, per questo ne faccio una copia su cui opero con splice. Così setDb capisce che è un nuovo array.
    setDb(copiaDatabase);
    setUser(editUser); // modifica il nostro user
    localStorage.setItem("user", JSON.stringify(editUser));
  }

  return (
    <UserContext.Provider
      value={{ db, registrazione, login, logout, message, user, editUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
