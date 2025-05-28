const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'i2024',
  password: 'unsa.2024',
  database: 'ingreso'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

module.exports = connection;
