import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { ProductManager } from './ProductManager.js';
import handlebars from 'express-handlebars';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const PORT = process.env.PORT || 8080;
const manager = new ProductManager();

// Configurar el motor de plantillas Handlebars
app.engine(
  'handlebars',
  handlebars.create({
    extname: '.handlebars', // o '.hbs' según tu preferencia
    defaultLayout: 'main', // el nombre del archivo principal de diseño
    layoutsDir: 'views/layouts', // la ubicación de los archivos de diseño
  }).engine
);
app.set('view engine', 'handlebars');
app.set('views', 'views');

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

  // Enviar la lista actualizada de productos a todos los clientes
  io.emit('updateProducts', manager.getAllProducts());

  res.status(201).json(newProduct);
});

app.put('/api/products/:pid', (req, res) => {
  // Actualizar un producto por ID
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body;
  manager.updateProduct(productId, updatedProduct);

  // Enviar la lista actualizada de productos a todos los clientes
  io.emit('updateProducts', manager.getAllProducts());

  res.json(updatedProduct);
});

app.delete('/api/products/:pid', (req, res) => {
  // Eliminar un producto por ID
  const productId = parseInt(req.params.pid);
  manager.removeProductById(productId);

  // Enviar la lista actualizada de productos a todos los clientes
  io.emit('updateProducts', manager.getAllProducts());

  res.json({ message: 'Producto eliminado correctamente' });
});

// Rutas para las vistas
app.get('/home', (req, res) => {
  // Renderizar la vista home con la lista de productos
  res.render('home', { products: manager.getAllProducts() });
});

// Inicia el servidor en el puerto especificado
httpServer.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

// Manejar conexiones WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('message', (data) => {
    console.log(data);
  });
});
