import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';
import ProductsModel from './dao/Models/productsModel.js';
import productsRouter from './Routes/products.routes.js';
import chatRouter from './Routes/chat.routes.js';
import loginRouter from './Routes/login.routes.js';
import checkUserRole from './middlewares/checkRoleMiddleware.js';


// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://marcosnicolass74:QSAno7IW9o8iCocA@cluster0.ufmmzqs.mongodb.net/', {
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

// Configurar middleware de sesión
app.use(
  session({
    secret: 'tu_secreto_aqui',
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware para parsear el body de las solicitudes
app.use(express.json());

// Rutas para productos y chat
app.use('/api/products', productsRouter);
app.use('/chat', chatRouter(io));
app.use('/login', loginRouter);

// Ruta protegida por el middleware de verificación de roles
app.get('/admin', checkUserRole, (req, res) => {
  res.render('admin', { user: req.session.user });
});

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
