import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import ComponenteAutorizados from "./Autorizados"; // Importa tus componentes
import ComponenteRegistros from "./Registros"; // Importa tus componentes
import AutorizacionIngreso from "./AutorizacionIngreso";
import { backendUrl } from '../configure';
Modal.setAppElement("#root"); // Usa el ID del elemento principal de tu app

const VerificacionAutorizacion = ({ handleLogout, user }) => {
  const [dni, setDni] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthorized, setIsAuthorized] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef(null);

  // En tu componente VerificacionAutorizacion.js

 /*  const handleHideMessage = () => {
    setTimeout(() => {
      setDni("");
      setIsVisible(false); // Cambiar el estado de visibilidad a falso después de, por ejemplo, 15000ms (15 segundos)
    }, 10000); // Puedes ajustar este tiempo según lo que desees
  }; */
  const logout = () => {
    // Llamamos a la función handleLogout para cerrar sesión
    handleLogout();
  };
  const handleVerification = async () => {
    try {
      let partes = dni.split('"');

      if (partes.length > 1) {
        let tdni = partes[4];
        setDni(tdni); // Actualizar el estado del DNI con los datos escaneados
      }

      const response = await axios.post(
        `${backendUrl}/verificarAutorizacion`,
        {
          dni: dni,
        }
      );
      if (dni.length > 15) setIsVisible(false);
      else {
        setIsVisible(true);
       // handleHideMessage();
      }

      setMessage(dni +'   '+ response.data.message );
      setIsAuthorized(response.data.isAuthorized);
      // Limpiar el campo DNI después de la verificación
    setDni("");
    } catch (error) {
      setMessage("Error al verificar la autorización");
    }
  };
  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      handleVerification();
    }
  };
  const handleScannerInput = (scannedData) => {
    setIsVisible(false);
    setDni(scannedData);

  };
  const [showModalAutorizados, setShowModalAutorizados] = useState(false);
  const [showModalRegistros, setShowModalRegistros] = useState(false);
  const [showModalCarga, setShowModalCarga] = useState(false);
  

  const handleShowModalAutorizados = () => {
    setShowModalAutorizados(true);
  };
  const handleShowModalCarga = () => {
    setShowModalCarga(true);
    
    
  };
  const handleShowModalRegistros = () => {
    setShowModalRegistros(true);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="verificarDNI">
      <header className="header">
        <div className="logo">
          <img src="logounsa.png" alt="logo"></img>
          <span className="logo-text">
            Universidad Nacional de Salta
            <br />
            Dirección General de Obras y Servicios
          </span>
        </div>
        <nav className="menu">
          {/* Botones que abren los modales */}
          <button onClick={handleShowModalAutorizados}>Autorizados</button>
          <button onClick={handleShowModalRegistros}>Registros</button>
          {user.role === 'admin' && <button onClick={handleShowModalCarga}>Cargar</button>}
          <button onClick={logout}>Salir</button>
        </nav>
      </header>
      {/* Modal para Autorizados */}
      <Modal
        isOpen={showModalAutorizados}
        onRequestClose={() => setShowModalAutorizados(false)}
      >
        <div>
          {" "}
          <button
            className="cerrar-btn"
            onClick={() => setShowModalAutorizados(false)}
          >
            Cerrar
          </button>
          <h2>Autorizados</h2>
          {/* Contenido del modal para Autorizados */}
          <ComponenteAutorizados />
        </div>
      </Modal>
       {/* Modal para carga de autorizados */}
      <Modal
        overlayClassName="Overlay"
        className="Modal"
        isOpen={showModalCarga}
        onRequestClose={() => setShowModalCarga(false)}
      >
       
        <div>
        
          <button
            className="cerrar-btn"
            onClick={() => setShowModalCarga(false)}
          >
            Cerrar
          </button>
          <h2>Autorizar</h2>
          {/* Contenido del modal para Autorizados */}
          <AutorizacionIngreso closeModal={setShowModalCarga} />
        </div>
      </Modal>
      {/* Modal para Registros */}
      <Modal
        isOpen={showModalRegistros}
        onRequestClose={() => setShowModalRegistros(false)}
      >
        <div>
          <button
            className="cerrar-btn"
            onClick={() => setShowModalRegistros(false)}
          >
            Cerrar
          </button>
          <h2>Registros</h2>
          {/* Contenido del modal para Registros */}
          <ComponenteRegistros />
        </div>
      </Modal>
      <div className="verification-content">
        <h1>Ingreso</h1>
        <input
          id="inputDNI"
          ref={inputRef}
          type="text"
          value={dni}
          onChange={(e) => handleScannerInput(e.target.value)}
          onKeyDown={handleEnterKey} // Manejar la tecla "Enter"
          placeholder="Ingrese el DNI"
        />
        <button onClick={handleVerification}>Verificar</button>
        <br />
        <p
          visible="none"
          className={isAuthorized ? "authorized" : "unauthorized"}
          style={{ display: isVisible ? "inline-block" : "none" }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default VerificacionAutorizacion;
