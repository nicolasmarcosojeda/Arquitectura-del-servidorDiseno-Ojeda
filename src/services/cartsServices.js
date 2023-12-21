import Cart from '../dao/models/Cart.js';
import Product from '../dao/models/Product.js'; // Ajusta la ruta según tu estructura

class CartService {
  async createCart() {
    const newCart = new Cart();
    await newCart.save();
    return newCart;
  }

  async getProductsInCart(cartId) {
    const cart = await Cart.findById(cartId).populate('products');
    return cart ? cart.products : [];
  }

  async addProductToCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    const product = await Product.findById(productId);

    if (cart && product) {
      cart.products.push(product);
      await cart.save();
    }
  }
}

export { CartService };
