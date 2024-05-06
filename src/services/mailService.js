import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_contraseña',
  },
});

const sendMail = async ({ to, subject, text }) => {
  try {
    await transporter.sendMail({
      from: 'tu_correo@gmail.com',
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
};

export { sendMail };
