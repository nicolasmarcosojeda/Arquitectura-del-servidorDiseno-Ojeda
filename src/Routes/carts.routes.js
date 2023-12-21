import express from 'express';
const router = express.Router();
import { CartService } from '../services/cartsService.js';

const cartService = new CartService();

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Ruta para obtener productos en un carrito por ID de carrito
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productsInCart = await cartService.getProductsInCart(cartId);
    res.json(productsInCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos en el carrito' });
  }
});

// Ruta para agregar un producto a un carrito por ID de carrito y ID de producto
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await cartService.addProductToCart(cartId, productId);
    res.json({ message: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

export default router;
