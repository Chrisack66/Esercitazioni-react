import React, { useState, useEffect } from "react";

function Registrazione({ database }) {
  const [formData, setFormData] = useState({
    username: "",
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState(database);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleRegistrazione(e) {
    e.preventDefault();
    const userExist = users.find(
      (x) => x.username === formData.username || x.email === formData.email
    );
    if (!userExist) {
      setUsers((prev) => [...prev, formData]); // metto setUsers qui cosi che al click dell'handle registrazione mi carica user
      setMessage(`La registazione al sito e' avvenuta con successo!`);
    } else {
      setMessage(`L'utente risulta registrato.`);
    }
  }

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users)); // sposto qui cosi al cambio di users salvo in localStorage
  }, [users]);

  return (
    <form onSubmit={handleRegistrazione}>
      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <input
          type="text"
          name="cognome"
          placeholder="Cognome"
          value={formData.cognome}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Registrati</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default Registrazione;
