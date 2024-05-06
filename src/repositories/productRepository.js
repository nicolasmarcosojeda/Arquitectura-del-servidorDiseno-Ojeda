import productDao from '../dao/productDao.js';

class ProductRepository {
  constructor() {
    this.productDao = new productDao(); // Instancia del DAO de productos
  }

  async getAllProducts() {
    try {
      // Lógica para obtener todos los productos
      const products = await this.productDao.getAllProducts();
      return products;
    } catch (error) {
      console.error('Error al obtener todos los productos:', error);
      throw new Error('Error al obtener todos los productos');
    }
  }

  async getProductById(productId) {
    try {
      // Lógica para obtener un producto por su ID
      const product = await this.productDao.getProductById(productId);
      return product;
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      throw new Error('Error al obtener el producto por ID');
    }
  }

  async addProduct(productData) {
    try {
      // Lógica para agregar un nuevo producto
      const newProduct = await this.productDao.addProduct(productData);
      return newProduct;
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      throw new Error('Error al agregar el producto');
    }
  }

  async updateProduct(productId, updatedData) {
    try {
      // Lógica para actualizar un producto
      const updatedProduct = await this.productDao.updateProduct(productId, updatedData);
      return updatedProduct;
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw new Error('Error al actualizar el producto');
    }
  }

  async deleteProduct(productId) {
    try {
      // Lógica para eliminar un producto
      await this.productDao.deleteProduct(productId);
      return { message: 'Producto eliminado exitosamente' };
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw new Error('Error al eliminar el producto');
    }
  }

  // Agrega más métodos según sea necesario
}

export default ProductRepository;
