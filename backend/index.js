const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const autorizados = require("./classes/autorizados");
const registrados = require("./classes/registrados");
const mail = require("./classes/oys-mail");
const logger = require("./classes/oys-error");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  mail.enviarCorreo(err.message);
  logger.error(err.message);
  res.status(500).send("Algo salió mal en el servidor");
});

app.post("/verificarAutorizacion", (req, res) => {
  try {
   
    const { dni } = req.body;
    console.log("Entrando a verificar2");
    autorizados.verificarAutorizacion(dni, (error, result) => {
      if (error) {
        console.log("hubo error en la consulta al backend");
        res.status(500).json(error);
     
      } else {
        res.status(200).json(result)
        console.log("Entrando a verificar3");
      }
    });
  } catch (error) {
    console.log(error);
    logger.error(error.message);
    mail.enviarCorreo(error.message);
    console.log("hubo error en la consulta al backend");
  }
  console.log("Entrando a verificar");
});

app.get("/listaAutorizados", (req, res) => {
  try {
    autorizados.getListaAutorizados((error, result) => {
      if (error) {
        res.status(500).json(error);
        
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
    logger.error(error.message);
    mail.enviarCorreo(error.message);
  }
});
app.post("/cargarAutorizado", (req, res) => {
  try {
    const { dni, nombre, apellido, dependencia } = req.body;

    autorizados.cargarAutorizado(
      dni,
      nombre,
      apellido,
      dependencia,
      (error, result) => {
        if (error) {
          res.status(500).json({ error: "No se pudo cargar los datos" });
        } else {
          res.status(200).json({ result });
        }
      }
    );
  } catch (error) {
    console.log(error);
    logger.error(error.message);
    mail.enviarCorreo(error.message);
  }
});

app.get("/listaRegistrados", (req, res) => {
  try {
    registrados.getListaRegistrados((error, result) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
    logger.error(error.message);
    mail.enviarCorreo(error.message);
  }
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);

});
