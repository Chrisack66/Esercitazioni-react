import { useState } from "react";

export function Dashboard({ logout }) {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );
  const [editUser, setEditUser] = useState(user);

  //handlechange attivata al change di ogni campo input. Leggo il valore dell'attributo value e dell'attributo name, destrutturizzando. Ogni volta handlechange aggiorna il valore di editUser tramite setEditUser. Ritorniamo un nuovo oggetto, che contiene tutto quello che stava nel valore originale di editUser, che corrispondeva a user, e aggiorniamo il valore della chiave name sovrascrivendolo, perché già presente.
  
  function handleChange(e) {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //PERCHE' vedo i dati modificati solo se SI AGGIORNA LA PAGINA ? TROVATE UNA SOLUZIONE.. (CIT. Monica)

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(editUser)); // aggiorna user
    const users = JSON.parse(localStorage.getItem("users"));

    const index = users.findIndex((x) => x.email === user.email);

    users.splice(index, 1, editUser); // modifica il nostro user
    localStorage.setItem("users", JSON.stringify(users)); // aggiorniamo il localStorage
    
    setUser(editUser); // aggiorna lo stato del componente
    setEdit(false); // chiude il form di modifica
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
