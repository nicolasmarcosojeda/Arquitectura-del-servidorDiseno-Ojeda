import passport from 'passport';
import User from './models/UsersModel.js';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';
import mongoose from 'mongoose';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  age: Number,
  role: {
    type: String,
    enum: ['regular', 'premium'],
    default: 'regular',
  },
  // Nueva propiedad documents
  documents: [{ name: String, reference: String }],

  // Propiedad last_connection existente
  last_connection: { type: Date, default: Date.now },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const registerUser = async (userData) => {
  try {
    const { email, password, firstName, lastName, age } = userData;
    const user = new User({ email, firstName, lastName, age });
    await User.register(user, password);
    return user;
  } catch (error) {
    throw new Error('Error al registrar usuario: ' + error.message);
  }
};

const authenticateUser = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
});

const logoutUser = (req, res) => {
  req.logout();
  res.redirect('/login');
};

// Estrategia JWT
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_secret_key_here',
};

passport.use(new JWTStrategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

// Función para generar tokens JWT
const generateJWT = (user) => {
  const payload = {
    sub: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
  return jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '1h' });
};

export { passport, registerUser, authenticateUser, logoutUser, generateJWT };
