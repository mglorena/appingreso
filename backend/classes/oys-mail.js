const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: '170.210.200.2', // Cambia esto por la dirección del servidor SMTP
    port: 25, // Cambia esto al puerto que tu proveedor SMTP utiliza para conexiones sin SSL
    ignoreTLS: true, // Ignorar cualquier intento de usar TLS/STARTTLS
    auth: {
      user: '', // Dejar vacío si no se requiere autenticación
      pass: '' // Dejar vacío si no se requiere autenticación
    },
    tls: {
      rejectUnauthorized: false // Opcional, desactiva la verificación del certificado
    }
  });
// Función para enviar el correo
function enviarCorreo(error) {
    const mailOptions = {
      from: "mlgarcia@unsa.edu.ar", // Cambia esto por tu dirección de correo
      to: "mlgarcia@gmail.com", // Cambia esto por la dirección del destinatario
      subject: "Ingreso Error",
      text: `Se ha producido un error en la aplicación:\n\n${error}`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error al enviar el correo:", error);
      } else {
        console.log("Correo enviado: " + info.response);
      }
    });
  }
  module.exports = {
    enviarCorreo
  };
  