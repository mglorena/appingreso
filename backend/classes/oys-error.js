const fs = require('fs');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'error', // Establecer el nivel de registro como error para capturar el error generado
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }) // Archivo de registro 'error.log'
    ]
  });
/*   function produceError() {
    try {
      // Genera un error intencional al acceder a una propiedad indefinida
      console.log("seguimos buscando");
      const obj =nulls;
      obj.File = "holra"; // Esto provocará un error
    } catch (error) {
      // Captura el error y lo registra utilizando el logger
      logger.error(`Se produjo un error: ${error.message}`);
     
    }
  } */
  module.exports = {
    logger
  };
  