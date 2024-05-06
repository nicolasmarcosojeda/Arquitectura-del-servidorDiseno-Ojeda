import jwt from 'jsonwebtoken';

// Cambia por una clave secreta segura
const secretKey = '03156487';

const generateAccessToken = (userId) => {
  const payload = { sub: userId }; // 'sub' es el ID del usuario
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Expira en 1 hora
};

export { generateAccessToken };
