import { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";

export function Dashboard() {
  const { logout, user, editUser, db } = useUser();
  const [edit, setEdit] = useState(false);
  const [userList, setUserList] = useState([]);
  const [friendList, setFriendList] = useState(user.friends || []);
  const [userExist, setUserExist] = useState(null);

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
  function handleAddFriendList(x) {
    const exist = friendList.find((y) => x.email === y.email);

    if (!exist) {
      setFriendList((prev) => [...prev, x]);
    } else {
      setUserExist(x);
    }
  }
  function handleRemove(x) {
    //localStorage.removeItem
    //rimuovere l'amico dall'array friends
  }
  useEffect(() => {
    // caricare la lista amici dal localStorage cosi da far funzionare il button disable
    const dbFriends = localStorage.getItem("friends");
  }, []);
  useEffect(() => {
    const copiaUser = { ...user };
    copiaUser.friends = friendList;
    localStorage.setItem("user", JSON.stringify(copiaUser));
    localStorage.setItem("users", JSON.stringify(copiaUser));
  }, [friendList]);

  useEffect(() => {
    const copyUserList = [...userList];
    console.log("Questo e userList", userList);
    console.log("Questo e la lista di amici", user.friends);
    const index = userList.findIndex((x) => {
      return friendList.some((y) => {
        /*console.log(x.email);
        console.log(y.email);*/
        console.log(y.email.trim() === x.email.trim());
        return y.email === x.email;
      });
    });
    console.log(index);
    //fixare logica della lista di amici.
    // dove quando viene aggiunto un amico, esso non spunti piu' nella sezione 'potresti conoscere'
    /*copyUserList.splice(index, 1);
    setUserList(copyUserList);*/
  }, [friendList]);

  return (
    <>
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
      <h1>Lista amici</h1>
      {friendList.map((x) => (
        <div>
          <img src={x.picture.thumbnail} alt={x.name.first} />
          <p>
            {x.name.title} {x.name.first} {x.name.last}
          </p>
          <button onClick={handleRemove(x)}>Rimuovi amicizia</button>
        </div>
      ))}
      <button onClick={logout}>Logout</button>
      <div className="cards">
        <h1>Potresti conoscere</h1>
        <hr />
        {userList.map((x) => (
          <div>
            <img src={x.picture.thumbnail} alt={x.name.first} />
            <p>
              {x.name.title} {x.name.first} {x.name.last}
            </p>

            <button onClick={() => handleAddFriendList(x)}>
              Aggiungi agli amici
            </button>
          </div>
        ))}
        <hr />
      </div>
    </>
  );
}
