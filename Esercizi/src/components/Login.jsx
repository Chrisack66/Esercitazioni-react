import { useState } from "react";

function Login({ onLogin, database }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [users, setUsers] = useState(database);
  const [message, setMessage] = useState("");
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
    } else {
      setMessage(`Credenziali errate!`);
    }
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setRemember(false);
  };

  return (
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
  );
}

export default Login;
