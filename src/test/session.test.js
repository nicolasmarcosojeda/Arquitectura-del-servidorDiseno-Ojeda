import { expect } from 'chai';
import request from 'supertest';
import app from '../../app.js';

describe('Sessions API', () => {
  describe('POST /api/sessions/login', () => {
    it('should log in a user and return a session token', async () => {
      const credentials = {
        username: 'example_user',
        password: 'example_password'
      };
      const res = await request(app)
        .post('/api/sessions/login')
        .send(credentials);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('token');
    });
  });

  describe('POST /api/sessions/logout', () => {
    it('should log out a user and invalidate the session token', async () => {
      // Lógica para iniciar sesión y obtener el token
      const token = 'example_session_token'; // Reemplaza 'example_session_token' con un token válido
      const res = await request(app)
        .post('/api/sessions/logout')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Logged out successfully');
    });
  });

  // Agrega más pruebas según sea necesario
});
