import { useState } from "react";
import { Dashboard } from "./Dashboard";

function Login({ onLogin, database }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [users, setUsers] = useState(database);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || null));

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      username: username,
      password: password,
      remember: remember,
    });

    const userExist = users.find(
      (x) => x.username === username && x.password === password
    );
    if (userExist) {
      setMessage(`Il Login al sito e' avvenuta con successo!`);
      setUser(userExist);
      localStorage.setItem("user", JSON.stringify(userExist))
    } else {
      setMessage(`Credenziali errate!`);
    }
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setRemember(false);
  };

  function handleLogout(){
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
    {user && <Dashboard user={user} logout={handleLogout}/>}
   </div>
  );
}

export default Login;
