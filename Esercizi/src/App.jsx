import { useState } from "react";
import "./App.css";
import InteractiveWelcome from "./components/InteractiveWelcome.jsx";
import Login from "./components/Login.jsx";
import Registrazione from "./components/Registrazione.jsx";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import { Dashboard } from "./components/Dashboard.jsx";


function App() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [] //principio di contesto, dati accessibili a tutti i componenti: figli, nipoti.. Problema del props Drilling: un dato che passa da componente a figli
  );

  return (
    <>
    <BrowserRouter>
      <nav>
        <Link to="/" >Home</Link>
        <Link to="/login" >Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<InteractiveWelcome />}/>
        <Route path="/login" element={<Login database={users} />}/>
        <Route path="/registrazione" element={<Registrazione database={users} />}/>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      
      
      
    </BrowserRouter>
    </>
  );
}

export default App;
