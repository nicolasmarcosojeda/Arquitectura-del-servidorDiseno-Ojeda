// En products.js
import express from 'express';
const router = express.Router();

// Importar el ProductManager u otras dependencias según sea necesario
import { ProductManager } from './ProductManager.js';

const manager = new ProductManager();

// Obtener todos los productos
router.get('/', (req, res) => {
  // Implementar la lógica para obtener todos los productos
  const products = manager.getAllProducts();
  res.json(products);
});

// Obtener un producto por ID
router.get('/:pid', (req, res) => {
  // Implementar la lógica para obtener un producto por ID
  const productId = parseInt(req.params.pid);
  const product = manager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
  // Implementar la lógica para agregar un nuevo producto
  const newProduct = req.body; // Asegúrate de que la solicitud incluya el cuerpo del producto
  manager.addProduct(newProduct);
  res.status(201).json(newProduct);
});

// Actualizar un producto por ID
router.put('/:pid', (req, res) => {
  // Implementar la lógica para actualizar un producto por ID
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body; // Asegúrate de que la solicitud incluya el cuerpo actualizado del producto
  manager.updateProduct(productId, updatedProduct);
  res.json({ message: 'Producto actualizado correctamente' });
});

// Eliminar un producto por ID
router.delete('/:pid', (req, res) => {
  // Implementar la lógica para eliminar un producto por ID
  const productId = parseInt(req.params.pid);
  manager.removeProductById(productId);
  res.json({ message: 'Producto eliminado correctamente' });
});

export default router;
