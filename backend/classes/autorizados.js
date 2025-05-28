const connection = require("./db");
const mail = require("./oys-mail");
const logger = require("./oys-error");

async function verificarAutorizacion(dni, callback) {
  try {
    const [rows, fields] = await connection.query(
      "SELECT * FROM autorizados WHERE DNI = ? LIMIT 1",
      [dni]
    );
    if (rows.length > 0) {
      await connection.query("call registros_insert(?)", [dni]);
      console.log("1");
      callback(null, { message: "Autorizado", isAuthorized: true });
    } else {
      callback(null, { message: "No Autorizado", isAuthorized: false });
    }
  } catch (error) {
    console.error(error);
    logger.error(error.message);
    mail.enviarCorreo(error.message);
  }
}
async function cargarAutorizado(dni, nombre, apellido, dependencia, callback) {
  try {
    const [rows, fields] = await connection.query(
      "call autorizados_insert(?,?,?,?)",
      [dni, nombre, apellido, dependencia]
    );
    if (rows.length > 0) {
      let message = "Ya se encontraba autorizado";
      try {
        let data = rows[0][0];
        if (data.Existe) {
          callback(null, { message, isOk: true });
        }
      } catch (error) {
        message = "Se cargaron los datos correctamente";
        callback(null, { message, isOk: true });
      }
      console.log(message);
    }
  } catch (e) {
    console.error(e);
    logger.error(e.message);
    mail.enviarCorreo(e.message);
  }
}

async function getListaAutorizados(callback) {
  try {
    const [rows, fields] = await connection.query(
      "call autorizados_getAll()" );

      if(rows.length >0){
        callback(null, rows[0]);
      }
      else{
        callback({
          message: "Error al consultar la lista de autorizados",
          isAuthorized: "unauthorized",
        });
      }
  } catch (error) {
    console.error(error);
    logger.error(error.message);
    mail.enviarCorreo(error.message);
  }
}

module.exports = {
  verificarAutorizacion,
  getListaAutorizados,
  cargarAutorizado,
};
