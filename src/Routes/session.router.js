import express from 'express';
import { generateJWT } from '../users.js';

const router = express.Router();

// Ruta para generar un token JWT al iniciar sesión
router.post('/login', (req, res) => {
  // Aquí deberías autenticar al usuario y luego generar un token JWT
  // Ejemplo básico: Si el usuario y la contraseña son correctos, genera un token JWT y lo devuelve en la respuesta
  const token = generateJWT(req.user);
  res.json({ token });
});

// Ruta para verificar el token JWT y devolver el usuario asociado
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default router;
