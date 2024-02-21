import Product from '../models/product.js';

const productDao = {
  getAllProducts: async () => {
    return await Product.find();
  },
  getProductById: async (productId) => {
    // Implementar la lógica para obtener un producto por su ID desde la base de datos
  },
  addProduct: async (productData) => {
    // Implementar la lógica para agregar un nuevo producto a la base de datos
  },
  // Agrega más funciones DAO según sea necesario
};

export default productDao;
