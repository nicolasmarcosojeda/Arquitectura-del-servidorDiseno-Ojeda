import errorMessages from './errorMessages.js';

// Middleware de autorización basado en el rol del usuario
const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
      // Verificar si el usuario tiene el rol requerido
      if (req.session.user && req.session.user.role === requiredRole) {
        // Si tiene el rol requerido, permitir el acceso a la siguiente ruta
        next();
      } else {
        // Si no tiene el rol requerido, devolver un error de acceso prohibido
        res.status(403).json({ status: 'error', error: 'Acceso prohibido' });
      }
    };
  };
  
  // Ejemplo de cómo usar el middleware de autorización
  router.get('/admin/dashboard', authorizeRole('admin'), (req, res) => {
    // Esta ruta solo será accesible por usuarios con rol de administrador
    res.render('adminDashboard');
  });
  