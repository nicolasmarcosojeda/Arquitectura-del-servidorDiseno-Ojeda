import express from 'express';
import { ProductManager } from './ProductManager.js';

const app = express();
const PORT = process.env.PORT || 8080;
const manager = new ProductManager();

// Ruta de bienvenida para el endpoint '/'
app.get('/', (req, res) => {
  res.send('Bienvenido a la aplicación de gestión de productos');
});

// Ruta para obtener productos con límite opcional
app.get('/products', (req, res) => {
  try {
    const limit = req.query.limit;
    let products = manager.getAllProducts();

    if (limit) {
      const parsedLimit = parseInt(limit);
      if (!isNaN(parsedLimit)) {
        products = products.slice(0, parsedLimit);
      } else {
        throw new Error('El parámetro de límite debe ser un número válido.');
      }
    }

    res.json({ productos: products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener un producto por ID
app.get('/product/:pid', (req, res) => {
  const productId = parseInt(req.params.pid); // Convertir a número entero
  const product = manager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
