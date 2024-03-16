
const canModifyProduct = (user, productId) => {
    // Verificar si el usuario es el propietario del producto o tiene un rol de administrador
    if (user && (user.role === 'admin' || user.products.includes(productId))) {
      return true;
    }
    return false;
  };
  
  // Esta función verifica si un usuario tiene permiso para eliminar un producto
  const canDeleteProduct = (user, productId) => {
    // Verificar si el usuario es el propietario del producto o tiene un rol de administrador
    if (user && (user.role === 'admin' || user.products.includes(productId))) {
      return true;
    }
    return false;
  };
  
  export { canModifyProduct, canDeleteProduct };
  