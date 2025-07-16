import { useState } from "react";
import "./App.css";
import InteractiveWelcome from "./components/InteractiveWelcome.jsx";
import Login from "./components/Login.jsx";
import Registrazione from "./components/Registrazione.jsx";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard.jsx";
import Private from "./components/Private.jsx";
import { useUser } from "./contexts/userContext.jsx";

function App() {
  const {user} = useUser();

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<InteractiveWelcome />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/registrazione"
            element={<Registrazione />}
          />
          <Route
            path="/dashboard"
            element={
              <Private isAuth={user}>
                <Dashboard />
              </Private>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
