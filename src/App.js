import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';

// Importar el modelo y las rutas
import productModel from './dao/models/product.Model.js';
import productsRouter from './Routes/products.routes.js';
import chatRouter from './Routes/chat.routes.js';

mongoose.connect('mongodb+srv://<marcosnicolass74>:<QSAno7IW9o8iCocA>@cluster0.mongodb.net/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB Atlas');
});

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const PORT = process.env.PORT || 8080;

// Configurar el motor de plantillas Handlebars
app.engine(
  'handlebars',
  handlebars.create({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: 'views/layouts',
  }).engine
);
app.set('view engine', 'handlebars');
app.set('views', 'views');

// Middleware para parsear el body de las solicitudes
app.use(express.json());

// Rutas para productos y chat
app.use('/api/products', productsRouter);
app.use('/chat', chatRouter);

// Manejar conexiones WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('message', (data) => {
    console.log(data);
  });
});

// Inicia el servidor en el puerto especificado
httpServer.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
