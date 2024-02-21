import productDao from '../dao/productDao.js';

class ProductRepository {
  constructor() {
    this.ProductDao = new productDao(); // Instancia del DAO de productos
  }

  async getAllProducts() {
    try {
      // Lógica para obtener todos los productos
      const products = await this.productDAO.getAllProducts();
      return products;
    } catch (error) {
      console.error('Error al obtener todos los productos:', error);
      throw new Error('Error al obtener todos los productos');
    }
  }

  async getProductById(productId) {
    try {
      // Lógica para obtener un producto por su ID
      const product = await this.productDAO.getProductById(productId);
      return product;
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      throw new Error('Error al obtener el producto por ID');
    }
  }

}

export default ProductRepository;
