import express from 'express';
const router = express.Router();

// Importa el servicio de autenticación u otra lógica necesaria
import { authenticate, getUserById } from '../dao/services/authService.js';

// Ruta para la página de login
router.get('/', (req, res) => {
  res.render('login'); // Ajusta según tus necesidades
});

// Ruta para procesar el formulario de login
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Realiza la autenticación, verifica las credenciales en tu sistema
  const isAuthenticated = await authService.authenticate(email, password);

  if (isAuthenticated) {
    // Si las credenciales son válidas, crea la sesión y redirige al usuario a la vista de productos
    req.session.user = { email, role: 'usuario' }; // Puedes agregar más detalles del usuario según tus necesidades
    res.redirect('/productos'); // Ajusta la ruta según tu configuración
  } else {
    // Si las credenciales no son válidas, redirige al usuario de vuelta al formulario de login
    res.redirect('/login');
  }
});

export default router;
