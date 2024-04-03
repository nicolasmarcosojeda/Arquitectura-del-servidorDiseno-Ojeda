import { expect } from 'chai';
import request from 'supertest';
import app from '../app'; // Ajusta la ruta a tu aplicación Express
import { addToCart, removeFromCart } from '../controllers/cartController'; // Ajusta la ruta a tu controlador del carrito de compras

describe('Cart Controller', () => {
  describe('addToCart', () => {
    it('should add a product to the cart', async () => {
      // Simula una solicitud HTTP
      const req = {
        body: { productId: 'product_id', quantity: 1 }, // Suponiendo que este es un ID de producto válido y una cantidad válida
      };
      // Simula un objeto de respuesta HTTP
      const res = {
        status: 200,
        message: '',
        json: function(data) {
          this.message = data.message;
        },
      };
      
      // Ejecuta la función addToCart del controlador
      await addToCart(req, res);
      
      // Verifica si el mensaje de respuesta indica que el producto se ha agregado al carrito
      expect(res.status).to.equal(200);
      expect(res.message).to.include('added to cart');
    });
  });

  describe('removeFromCart', () => {
    it('should remove a product from the cart', async () => {
      // Simula una solicitud HTTP
      const req = {
        body: { productId: 'product_id' }, // Suponiendo que este es un ID de producto válido
      };
      // Simula un objeto de respuesta HTTP
      const res = {
        status: 200,
        message: '',
        json: function(data) {
          this.message = data.message;
        },
      };
      
      // Ejecuta la función removeFromCart del controlador
      await removeFromCart(req, res);
      
      // Verifica si el mensaje de respuesta indica que el producto se ha eliminado del carrito
      expect(res.status).to.equal(200);
      expect(res.message).to.include('removed from cart');
    });
  });
});
