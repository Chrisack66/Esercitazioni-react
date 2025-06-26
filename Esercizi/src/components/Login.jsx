import { useState } from "react";
import { Dashboard } from "./Dashboard";

function Login({ database }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [users, setUsers] = useState(database);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const userExist = users.find(
      (x) => x.username === username && x.password === password
    );
    if (userExist) {
      setMessage(`Il Login al sito e' avvenuta con successo!`);
      setUser(userExist);
      localStorage.setItem("user", JSON.stringify(userExist));
    } else {
      setMessage(`Credenziali errate!`);
    }
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setRemember(false);
  };

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
