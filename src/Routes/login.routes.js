import express from 'express';
import UserDto from '../dto/userDto.js'; // Asegúrate de que la ruta sea correcta
import { authenticate } from '../services/authService.js';

// Crea una instancia del enrutador de express
const router = express.Router();

// Ruta para obtener información del usuario actual
router.get('/current', (req, res) => {
  try {
    // Obtener datos del usuario desde la sesión
    const user = req.session.user;

    // Crear DTO del usuario con la información necesaria
    const userDTO = new UserDto(user.id, user.username, user.role);

    // Enviar el DTO del usuario como respuesta
    res.json({ user: userDTO });
  } catch (error) {
    console.error('Error al obtener información del usuario:', error);
    res.status(500).json({ status: 'error', error: 'Error interno del servidor', details: error.message });
  }
});

// Middleware de autorización para restringir el acceso basado en el rol del usuario
function checkRole(role) {
  return (req, res, next) => {
    if (req.session.user && req.session.user.role === role) {
      next(); // Si el usuario tiene el rol adecuado, permite el acceso a la siguiente ruta
    } else {
      res.status(403).json({ status: 'error', error: 'Acceso no autorizado' });
    }
  };
}

export { router as default, checkRole };
