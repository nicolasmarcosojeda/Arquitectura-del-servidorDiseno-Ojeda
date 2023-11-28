import express from 'express';
import { ProductManager } from './ProductManager.js'; // Asegúrate de usar la extensión '.js'

const app = express();
const PORT = process.env.PORT || 8080;
const manager = new ProductManager();
// Middleware para parsear el body de las solicitudes
app.use(express.json());

// Ruta de bienvenida para el endpoint '/'
app.get('/', (req, res) => {
  res.send('Bienvenido a la aplicación de gestión de productos');
});

// Rutas para productos
app.get('/api/products/', (req, res) => {
  // Listar todos los productos
  res.json(manager.getAllProducts());
});

app.get('/api/products/:pid', (req, res) => {
  // Obtener un producto por ID
  const productId = parseInt(req.params.pid);
  const product = manager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.post('/api/products/', (req, res) => {
  // Agregar un nuevo producto
  const newProduct = req.body;
  manager.addProduct(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:pid', (req, res) => {
  // Actualizar un producto por ID
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body;
  manager.updateProduct(productId, updatedProduct);
  res.json(updatedProduct);
});

app.delete('/api/products/:pid', (req, res) => {
  // Eliminar un producto por ID
  const productId = parseInt(req.params.pid);
  manager.removeProductById(productId);
  res.json({ message: 'Producto eliminado correctamente' });
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
