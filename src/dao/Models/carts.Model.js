import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  // Define tu esquema para el carrito aquí
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
