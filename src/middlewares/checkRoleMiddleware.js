function checkUserRole(req, res, next) {
    // Verificar el rol del usuario almacenado en la sesión
    const userRole = req.session.user ? req.session.user.role : null;
  
    // Si el usuario no tiene un rol o no es admin, redirige a la página de inicio de sesión
    if (!userRole || userRole !== 'admin') {
      return res.redirect('/login');
    }
  
    // Si el usuario tiene el rol adecuado, continúa con la siguiente middleware o ruta
    next();
  }
  
  export default checkUserRole;
  