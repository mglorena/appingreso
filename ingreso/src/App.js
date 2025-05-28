
import React, { useState, useEffect  } from "react";
import Login from "./componentes/Login";
import VerificacionAutorizacion from "./componentes/VerificacionAutorizacion";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userData');
    setUser({});
  };
  const handleLogin = (username, password) => {
    // Aquí puedes realizar la lógica de autenticación, por ejemplo, con una llamada a un backend o mediante lógica local
    // En este ejemplo, comparamos valores estáticos para el usuario y contraseña
    if (username === "dgoys" && password === "unsa.2024") {
      const userData = { username: username, role: 'guardia' /* Definir el rol del usuario */ };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      if (username === "dgoys.admin" && password === "unsa2024") {
        const userData = { username: username, role: 'admin' /* Definir el rol del usuario */ };
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('userData', JSON.stringify(userData));
      } else {
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      }
    }
  };
  useEffect(() => {
    // Verificar si hay información de usuario en localStorage al cargar la página
    const userDataFromStorage = localStorage.getItem('userData');
    if (userDataFromStorage) {
      setUser(JSON.parse(userDataFromStorage));
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <VerificacionAutorizacion handleLogout={handleLogout} user={user} />
        /* Pasamos la función handleLogout como prop al componente VerificacionAutorizacion */
      )}
    </div>
  );
};

export default App;
