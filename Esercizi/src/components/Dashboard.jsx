export function Dashboard({user, logout}){

    return(
        <div>
            <h1>Benvenuto {user.username}!</h1>
            <p>Qui di seguito trovi i tuoi dati personali</p>
            <div>
                <p>Nome: {user.nome}</p>
                <p>Cognome: {user.cognome}</p>
                <p>Email: {user.email}</p>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}