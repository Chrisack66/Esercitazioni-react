import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { useUser } from "../contexts/userContext"; 


function Login() {
  const { login, message, logout, user } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    setUsername("");
    setPassword("");
    setRemember(false);
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setRemember(false);
  };

  function handleLogout() {
    logout();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <button type="submit" disabled={!username || !password}>
          Login
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        {message && <p>{message}</p>}
      </form>
      {user && <Dashboard logout={handleLogout} />}{" "}
      {/*se esiste uno user loggato, mi fa un render condizionale della mia dashboard*/}
    </div>
  );
}

export default Login;

//fare un pulsante che permette di attivare una modalità modifica che permette di andare a modificare i dati di utente
