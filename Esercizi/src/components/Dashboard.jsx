import { useState } from "react";

export function Dashboard({ logout }) {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );
  const [editUser, setEditUser] = useState(user);

  function handleChange(e) {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //PERCHE' NON SI AGGIORNA LA PAGINA? TROVATE UNA SOLUZIONE.. (CIT. Monica)

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(editUser)); // aggiorna user
    const users = JSON.parse(localStorage.getItem("users"));

    const index = users.findIndex((x) => x.email === user.email);

    users.splice(index, 1, editUser); // modifica il nostro user
    localStorage.setItem("users", JSON.stringify(users)); // aggiorniamo il localStorage
    setEdit(false);
  }

  return (
    <div>
      <h1>Benvenuto {user.username}!</h1>
      <p>Qui di seguito trovi i tuoi dati personali</p>
      <button onClick={() => setEdit(true)}>Modifica</button>
      {edit ? (
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            onChange={handleChange}
            placeholder={user.nome}
            required
          />

          <label>Cognome:</label>
          <input
            type="text"
            name="cognome"
            onChange={handleChange}
            placeholder={user.cognome}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="xxxxxxxx"
            required
          />
          <button type="submit">Conferma modifica</button>
        </form>
      ) : (
        <div>
          <p>Nome: {user.nome}</p>
          <p>Cognome: {user.cognome}</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
}
