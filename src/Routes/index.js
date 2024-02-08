import express from 'express';
import productsController from '../controllers/productsController.js';

const router = express.Router();

// Definir rutas para productos
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', productsController.addProduct);
// Agrega más rutas según sea necesario

export default router;