import Product from '../dao/models/Product.js';  // Ajusta la ruta según tu estructura

class ProductService {
  async addProduct(productData) {
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
  }

  async removeProductById(productId) {
    await Product.findByIdAndRemove(productId);
  }

  async getAllProducts() {
    return await Product.find();
  }
}

export { ProductService };
