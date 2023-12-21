import express from 'express';
import ProductModel from '../dao/models/ProductModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/', async (req, res) => {
  const newProduct = req.body;

  try {
    const product = await ProductModel.create(newProduct);
    io.emit('updateProducts', product); // Emite solo el nuevo producto
    res.status(201).json(product);
  } catch (error) {
    console.error('Error al crear un nuevo producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Otras rutas como actualización y eliminación de productos

export default router;
