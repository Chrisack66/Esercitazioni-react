import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";

export function Dashboard() {
  const { logout, user, editUser } = useContext(UserContext);
  const [edit, setEdit] = useState(false);

  const [newUser, setnewUser] = useState(user);

  //handlechange attivata al change di ogni campo input. Leggo il valore dell'attributo value e dell'attributo name, destrutturizzando. Ogni volta handlechange aggiorna il valore di editUser tramite setEditUser. Ritorniamo un nuovo oggetto, che contiene tutto quello che stava nel valore originale di editUser, che corrispondeva a user, e aggiorniamo il valore della chiave name sovrascrivendolo, perché già presente.

  function handleChange(e) {
    const { name, value } = e.target;
    setnewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //PERCHE' vedo i dati modificati solo se SI AGGIORNA LA PAGINA ? TROVATE UNA SOLUZIONE.. (CIT. Monica)

  function handleSubmit(e) {
    e.preventDefault();
    editUser(newUser);
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
