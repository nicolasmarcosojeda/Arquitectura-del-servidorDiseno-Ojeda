
import express from 'express';
const router = express.Router();

// Ruta para el logout
router.get('/', (req, res) => {
  // Destruye la sesión y redirige a la vista de login
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/login'); // Ajusta la ruta según tu configuración
  });
});

export default router;
