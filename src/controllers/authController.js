// authController.js

import { generateAccessToken } from './authController.js';

// Controlador para iniciar sesión
const login = async (req, res) => {
  // Aquí se realizaría la lógica de autenticación
  // Supongamos que se verifica el nombre de usuario y contraseña correctamente
  const userId = '123'; // ID del usuario autenticado

  // Generar el token de acceso usando la función generateAccessToken
  const accessToken = generateAccessToken(userId);

  // Devolver el token de acceso en la respuesta
  res.json({ accessToken: accessToken });
};

export { login };
