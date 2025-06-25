import { useState } from "react";
import "./App.css";
import InteractiveWelcome from "./components/InteractiveWelcome.jsx";
import Login from "./components/Login.jsx";
import Registrazione from "./components/Registrazione.jsx";

function App() {
  const handleLogin = (loginData) => {
    console.log("Login data:", loginData);
  };
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [] //principio di contesto, dati accessibili a tutti i componenti: figli, nipoti.. Problema del props Drilling: un dato che passa da componente a figli
  );

  return (
    <>
      <InteractiveWelcome />
      <Login onLogin={handleLogin} database={users} />
      <Registrazione database={users} />
    </>
  );
}

export default App;
