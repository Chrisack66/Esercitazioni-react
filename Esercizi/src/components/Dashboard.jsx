import { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";

export function Dashboard() {
  const { logout, user, editUser, db } = useUser();
  const [edit, setEdit] = useState(false);
  const [userList, setUserList] = useState([]);
  const [amici, setAmici] = useState(user.amici || []);
  const [rimuoviAmico, setRimuoviAmico] = useState(false);
  const [toggled, setToggled] = useState(false);

  const [newUser, setnewUser] = useState(user);
  useEffect(() => {
    const fetchDati = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=6");
        const dati = await response.json();
        setUserList(dati.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDati();
  }, []);

  useEffect(() => {
    const copiedUser = { ...user };
    copiedUser.amici = amici;
    localStorage.setItem("user", JSON.stringify(copiedUser));
    const copiedUsers = [...db];
    const index = db.findIndex((x) => x.email === user.email);
    copiedUsers.splice(index, 1, copiedUser);
    localStorage.setItem("users", JSON.stringify(copiedUsers));
  }, [amici]);



  const handleAddFriend = (user) => {
    if (!amici.some((x) => x.email === user.email)) {
      // Controllo se l'utente è già presente tra gli amici
      setAmici((prev) => [...prev, user]);
    }
  };

  const handleRemoveFriend = (email) => {
    setAmici((prev) => prev.filter((x) => x.email !== email));
    setRimuoviAmico(true);
    localStorage.removeItem("user");
  }

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

  const handleClick = () => {
    if (!toggled) {
      handleAddFriend();
    }
    else {
      handleRemoveFriend();
    }
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
      <div className="suggerimenti">
        <h6>Potresti conoscere...</h6>
        {userList.map((x) => (
          <div>
            <p>
              {x.name.title} {x.name.first} {x.name.last}
            </p>

            <img src={x.picture.medium}></img>
            <button onClick = {() => {handleClick}} className="aggiungi">
              Aggiungi
            </button>
          </div>
        ))}
        {amici.map((x) => (
          <div>
            <p>
              {x.name.title} {x.name.first} {x.name.last}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

//FIXARE LA QUESTIONE DEL BUTTON CHE ALL'ONCLICK TOGGLED DEVE AGGIUNGERE GLI AMICI, AL NOT TOGGLED DEVE TOGLIERLI. NON FUNGE :cgit