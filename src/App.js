import express from 'express';
import { login } from './controllers/authController.js';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';
import logger from './config/logger.js';
import productsModel from './Models/productsModel.js';
import productsroutes from './Routes/products.routes.js';
import chatRouter from './routes/chat.routes.js';
import loginRouter from './routes/login.routes.js';
import logoutRouter from './routes/logout.routes.js';
import checkUserRole from './middlewares/checkRoleMiddleware.js';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import errorMessages from './errorHandler.js';


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
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    // Buscar usuario en la base de datos por nombre de usuario
    const user = await User.findOne({ username });

    // Si el usuario no existe, devolver un mensaje de error
    if (!user) {
      return done(null, false, { message: 'Nombre de usuario incorrecto' });
    }

    // Verificar si la contraseña es válida
    const isValidPassword = await user.isValidPassword(password);

    // Si la contraseña no es válida, devolver un mensaje de error
    if (!isValidPassword) {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }

    // Si el usuario y la contraseña son válidos, devolver el usuario autenticado
    return done(null, user);
  } catch (error) {
    // Si ocurre un error durante la autenticación, devolver el error
    return done(error);
  }
}));

// Serializar y deserializar usuarios
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Buscar usuario en la base de datos por su ID
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});


// Serializar y deserializar usuarios
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Aquí deberías obtener el usuario por su ID desde la base de datos
  done(null, user);
});

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Productos y Carrito',
      version: '1.0.0',
      description: 'Documentación de la API de los módulos de productos y carrito',
    },
  },
  // Ruta de los archivos de especificación de Swagger
  apis: ['./controllers/productsController.js', './controllers/cartController.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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

app.get('/mockingproducts', async (req, res) => {
  try {
    const result = await generateMockProducts();
    res.json(result);
  } catch (error) {
    console.error('Error al generar productos ficticios:', error);
    res.status(500).json({ error: errorMessages.databaseError });
  }
});

// Rutas para productos y chat
app.use('/api/products', productsroutes);
app.use('/chat', chatRouter(io));
app.use('/register', logoutRouter);
app.use('/login', loginRouter);

// Agregar la ruta para /loggerTest
app.get('/loggerTest', (req, res) => {
  // Ejemplos de diferentes niveles de registro para probar el logger
  logger.debug('Este es un mensaje de debug');
  logger.http('Este es un mensaje de http');
  logger.info('Este es un mensaje de info');
  logger.warning('Este es un mensaje de warning');
  logger.error('Este es un mensaje de error');
  logger.fatal('Este es un mensaje de fatal');

  // Envía una respuesta al cliente
  res.send('Registro de prueba completado');
});

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
