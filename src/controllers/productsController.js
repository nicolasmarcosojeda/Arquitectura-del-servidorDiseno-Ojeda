// controllers/productsController.js
import productService from '../services/productService.js';

const productsController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },
  getProductById: async (req, res) => {
    // Implementar la lógica para obtener un producto por su ID
  },
  addProduct: async (req, res) => {
    // Implementar la lógica para agregar un nuevo producto
  },
  // Agrega más controladores según sea necesario
};

export default productsController;
