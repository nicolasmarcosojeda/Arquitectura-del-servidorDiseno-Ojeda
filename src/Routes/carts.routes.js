// Importa express y otros módulos necesarios
import express from 'express';
import CartService from '../services/cartService.js'; // Ajusta la ruta según tu estructura
import ProductService from '../services/productService.js'; // Ajusta la ruta según tu estructura

// Crea una instancia del enrutador de express
const router = express.Router();
const cartService = new CartService();
const productService = new ProductService();

// Eliminar un producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await cartService.removeProductFromCart(cartId, productId);
    res.json({ message: 'Producto eliminado del carrito correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ status: 'error', error: 'Error interno del servidor' });
  }
});

// Actualizar el carrito con un arreglo de productos
router.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body.products; // Asegúrate de que el cuerpo de la solicitud contenga un arreglo de productos
    await cartService.updateCart(cartId, products);
    res.json({ message: 'Carrito actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el carrito:', error);
    res.status(500).json({ status: 'error', error: 'Error interno del servidor' });
  }
});

// Actualizar la cantidad de ejemplares de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity; // Asegúrate de que el cuerpo de la solicitud contenga la nueva cantidad
    await cartService.updateProductQuantity(cartId, productId, quantity);
    res.json({ message: 'Cantidad de producto actualizada en el carrito correctamente' });
  } catch (error) {
    console.error('Error al actualizar la cantidad del producto en el carrito:', error);
    res.status(500).json({ status: 'error', error: 'Error interno del servidor' });
  }
});

// Eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    await cartService.clearCart(cartId);
    res.json({ message: 'Todos los productos han sido eliminados del carrito' });
  } catch (error) {
    console.error('Error al eliminar todos los productos del carrito:', error);
    res.status(500).json({ status: 'error', error: 'Error interno del servidor' });
  }
});

// Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un "populate"
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getCartWithProducts(cartId);
    res.json(cart);
  } catch (error) {
    console.error('Error al obtener el carrito con productos:', error);
    res.status(500).json({ status: 'error', error: 'Error interno del servidor' });
  }
});

// Exporta el router para ser utilizado en otros archivos
export default router;
