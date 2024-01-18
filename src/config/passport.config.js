import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { authenticate, getUserById } from '../services/authService.js';

passport.use(new LocalStrategy(
  async (username, password, done) => {
    const user = authenticate(username, password);

    if (!user) {
      return done(null, false, { message: 'Usuario o contraseña incorrectos' });
    }

    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = getUserById(id);
  done(null, user);
});

export default passport;
