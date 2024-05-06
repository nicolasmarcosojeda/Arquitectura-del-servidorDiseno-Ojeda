import { generateAccessToken } from '.../tokenServices.js';

const login = async (req, res) => {
  // Simula la autenticación del usuario
  const userId = '123'; // ID del usuario autenticado

  // Genera el token de acceso
  const accessToken = generateAccessToken(userId);

  // Retorna el token como respuesta
  res.json({ accessToken: accessToken });
};

export { login };
