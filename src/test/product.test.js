// Importa chai para realizar afirmaciones
import { expect } from 'chai';
// Importa supertest para realizar solicitudes HTTP simuladas
import request from 'supertest';
// Importa la aplicación Express
import app from '../app'; // Asegúrate de ajustar la ruta según la ubicación de tu aplicación

// Describe el conjunto de pruebas para el endpoint GET /api/products
describe('GET /api/products', () => {
  // Prueba para verificar si se obtienen todos los productos correctamente
  it('should return all products', async () => {
    // Realiza una solicitud GET a la ruta /api/products
    const res = await request(app).get('/api/products');

    // Afirmaciones sobre la respuesta recibida
    expect(res.status).to.equal(200); // Espera que el código de estado sea 200
    expect(res.body).to.be.an('array'); // Espera que el cuerpo de la respuesta sea un array
    // Puedes agregar más afirmaciones según tus necesidades
  });
});
