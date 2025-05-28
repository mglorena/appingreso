import React, { useState } from "react";
import { backendUrl } from '../configure';

const AutorizacionIngreso = ({ closeModal }) => {
  const [dni, setDNI] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dependencia, setDependencia] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseModal = (e) => {
    // Llamar a la función recibida por props para cerrar el modal
    closeModal(e);
  };
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    switch (field) {
      case "dni":
        setDNI(value);
        break;
      case "nombre":
        setNombre(value);
        break;
      case "apellido":
        setApellido(value);
        break;
      case "dependencia":
        setDependencia(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      
      const response = await fetch(`${backendUrl}/cargarAutorizado`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dni, nombre, apellido, dependencia }),
      });
    

      if (response.ok) {
        const data = await response.json(); // Parsea la respuesta a JSON
        
        if (data.result.message) {
          console.log("Mensaje del servidor:", data.result.message);
          // Aquí puedes hacer lo que necesites con el mensaje recibido desde el backend
        }

        handleCloseModal(false);
      } else {
        console.error("Error al enviar los datos" + response);
      }
    } catch (error) {
      console.error("Error en la comunicación:", error);
    }

     setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}
      >
        <label htmlFor="dni" style={{ width: "150px", marginRight: "10px" }}>
          DNI:
        </label>
        <input
          type="text"
          id="dni"
          value={dni}
          onChange={(e) => handleInputChange(e, "dni")}
          required
        />
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}
      >
        <label htmlFor="nombre" style={{ width: "150px", marginRight: "10px" }}>
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          style={{ width: "350px", marginRight: "10px" }}
          onChange={(e) => handleInputChange(e, "nombre")}
          required
        />
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}
      >
        <label
          htmlFor="apellido"
          style={{ width: "150px", marginRight: "10px" }}
        >
          Apellido:
        </label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          style={{ width: "350px", marginRight: "10px" }}
          onChange={(e) => handleInputChange(e, "apellido")}
          required
        />
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}
      >
        <label
          htmlFor="dependencia"
          style={{ width: "150px", marginRight: "10px" }}
        >
          Dependencia:
        </label>
        <input
          type="text"
          id="dependencia"
          value={dependencia}
          style={{ width: "350px", marginRight: "10px" }}
          onChange={(e) => handleInputChange(e, "dependencia")}
        />
      </div>
      <div style={{alignContent:"center ", alignSelf:"center"}}>
      <button className="btnEnviar" type="submit" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Enviar"}
      </button>
      </div>
     
    </form>
  );
};

export default AutorizacionIngreso;
