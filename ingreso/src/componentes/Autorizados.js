import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Autorizados.css'; // Archivo de estilos CSS para el componente
import { backendUrl } from '../configure';
const ListaAutorizados = () => {
  const [autorizados, setAutorizados] = useState([]);

  useEffect(() => {
    obtenerListaAutorizados();
  }, []);

  const obtenerListaAutorizados = async () => {
    try {
       const response = await axios.get(`${backendUrl}/listaAutorizados`);
       console.log(response);
      setAutorizados(response.data); 
      
    } catch (error) {
      console.error('Error al obtener la lista de autorizados:', error);
    }
  };

  return (
    <div className="lista-personas">
      
      <h2>Lista de Personas Autorizadas</h2>
      <table>
        <thead>
          <tr>
       
            <th>DNI</th>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Dependencia</th>
          </tr>
        </thead>
        <tbody>
         {autorizados.map((autorizado) => (
            <tr key={autorizado.autorizadoID}>
              <td>{autorizado.DNI}</td>
              <td>{autorizado.Apellido}</td>
              <td>{autorizado.Nombre}</td>
              <td>{autorizado.Dependencia}</td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  );
};

export default ListaAutorizados;

