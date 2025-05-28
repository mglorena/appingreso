import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Autorizados.css'; // Archivo de estilos CSS para el componente
import { backendUrl } from '../configure';
const ListaRegistrados = () => {
  const [registrados, setRegistrados] = useState([]);

  useEffect(() => {
    obtenerListaRegistrados();
  }, []);

  const obtenerListaRegistrados = async () => {
    try {
      const response = await axios.get(`${backendUrl}/listaRegistrados`);
     
      setRegistrados(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de registradas:', error);
    }
  };

  return (
    <div className="lista-personas">
      
      <h2>Lista de Personas Registradas</h2>
      <table>
        <thead>
          <tr>
          
            <th>DNI</th>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Dependencia</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {registrados.map((registro) => (
            <tr key={registro.registroId}>
              <td>{registro.DNI}</td>
              <td>{registro.Apellido}</td>
              <td>{registro.Nombre}</td>
              <td>{registro.Dependencia}</td>
              <td>{registro.Fecha}</td>
              <td>{registro.Hora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaRegistrados;
