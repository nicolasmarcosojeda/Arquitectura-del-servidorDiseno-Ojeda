import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';
import productsModel from './dao/Models/productsModel.js';
import productsroutes from './Routes/products.routes.js';
import chatRouter from './routes/chat.routes.js';
import loginRouter from './routes/login.routes.js';
import logoutRouter from './routes/logout.routes.js';
import checkUserRole from './middlewares/checkRoleMiddleware.js';
import passport from 'passport';
import LocalStrategy from 'passport-local';


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

app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: true,
}));


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

// Configurar Passport
app.use(passport.initialize());
app.use(passport.session());

// Configurar estrategia local de Passport
passport.use(
  new LocalStrategy((username, password, done) => {
   
  })
);

// Serializar y deserializar usuarios
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Aquí deberías obtener el usuario por su ID desde la base de datos
  done(null, user);
});


// Configurar middleware de sesión
// Ruta de registro
app.post('/register', async (req, res) => {
  // Aquí deberías crear un nuevo usuario en la base de datos
  // y luego autenticarlo usando Passport
});

// Ruta de inicio de sesión
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard', // Cambia la redirección a donde quieras después del inicio de sesión exitoso
    failureRedirect: '/login', // Cambia la redirección en caso de fallo de inicio de sesión
    failureFlash: true,
  })
);

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
app.use('/api/products', productsroutes);
app.use('/chat', chatRouter(io));
app.use('/register', logoutRouter);
app.use('/login', loginRouter);

// Ruta protegida
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    // El usuario está autenticado, puedes mostrar la página de dashboard
    res.render('dashboard', { user: req.user });
  } else {
    // El usuario no está autenticado, redirige al inicio de sesión
    res.redirect('/login');
  }
});


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
