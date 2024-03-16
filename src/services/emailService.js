// Importar nodemailer
const nodemailer = require('nodemailer');

// Configurar el transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Aquí puedes especificar el servicio de correo electrónico que estás utilizando
  auth: {
    user: 'mdmono.ind2@gmail.com', // Coloca aquí tu dirección de correo electrónico
    pass: 'Nicolucero21' // Coloca aquí tu contraseña
  }
});

// Función para enviar correo electrónico de restablecimiento de contraseña
async function enviarCorreoRestablecimiento(destinatario, token) {
  try {
    // Configurar el mensaje de correo electrónico
    const mensaje = {
      from: 'marcosnicolass.74@gmail.com', // Dirección de correo electrónico del remitente
      to: destinatario, // Dirección de correo electrónico del destinatario
      subject: 'Restablecimiento de Contraseña', // Asunto del correo electrónico
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="http://tuapp.com/restablecer-contraseña/${token}">Restablecer Contraseña</a></p>` // Cuerpo del correo electrónico con un enlace que contiene el token único
    };

    // Enviar el correo electrónico
    const info = await transporter.sendMail(mensaje);
    console.log('Correo electrónico enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw error; // Propagar el error para manejarlo en otro lugar si es necesario
  }
}

// Exportar la función para que pueda ser utilizada en otros archivos
module.exports = {
  enviarCorreoRestablecimiento
};