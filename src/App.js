// Importar el modelo y las rutas
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';

import productsModel from './dao/Models/productsModel.js';
import productsRouter from './routes/products.routes.js';
import chatRouter from './routes/chat.routes.js';

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // Agrega esta opción
  useFindAndModify: false, // Agrega esta opción
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
app.use('/chat', chatRouter(io)); // Pasa la instancia de io al enrutador de chat

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
