// src/routes/products.js
import express from 'express';
import { ProductManager } from '../ProductManager.js';  // Ajusta la ruta según tu estructura

const router = express.Router();
const manager = new ProductManager();  // Asegúrate de tener esta instancia disponible

router.post('/', (req, res) => {
  const newProduct = req.body;
  manager.addProduct(newProduct);

  // Enviar la lista actualizada de productos a todos los clientes
  req.app.get('io').emit('updateProducts', manager.getAllProducts());

  res.status(201).json(newProduct);
});

router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  manager.removeProductById(productId);

  // Enviar la lista actualizada de productos a todos los clientes
  req.app.get('io').emit('updateProducts', manager.getAllProducts());

  res.json({ message: 'Producto eliminado correctamente' });
});

export default router;
