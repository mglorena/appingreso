import React, { useState } from 'react';
import "../css/Login.css";
const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Llamamos a la función handleLogin pasada como prop desde el componente padre
    handleLogin(username, password);
  };

  return (
<div className="login">
<div className="logo">
          <img src="logounsa.png" alt="logo"></img>
          
        </div>
      <h2>Acceso a Sistema de Ingreso</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          className='inputLogin'
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
