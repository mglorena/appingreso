const connection = require("./db");
const mail = require("./oys-mail");
const logger = require("./oys-error");

async function getListaRegistrados(callback) {
  try {
    const [rows, fields] = await connection.query(
      "call registros_getAll()");

      if(rows.length >0){
        callback(null, rows[0]);
      }
      else{
        callback({
          message: "Error al consultar la lista de registrados"
        });
      }

    
  } catch (error) {
    console.error(error);
    logger.error(error.message);
    mail.enviarCorreo(error.message);
  }
}

module.exports = {
  getListaRegistrados,
};
