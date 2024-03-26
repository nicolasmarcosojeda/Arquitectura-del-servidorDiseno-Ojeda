
import productService from '../services/productService.js';
import errorMessages from './errorMessages.js';
import { canModifyProduct, canDeleteProduct } from './productPermissionsController.js';


/**
 * Controlador para gestionar operaciones relacionadas con productos.
 * @namespace productsController
 */

const productsController = {
  /**
   * Obtiene todos los productos.
   * @memberof productsController
   * @function getAllProducts
   * @param {Object} req - Objeto de solicitud.
   * @param {Object} res - Objeto de respuesta.
   * @returns {Object} - Retorna una lista de productos.
   * @throws {Error} - Retorna un error si falla la obtención de los productos.
   */
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
  modifyProduct: async (req, res) => {
    const productId = req.params.id;
    const user = req.user; // Suponiendo que tienes el usuario autenticado en req.user

    if (!canModifyProduct(user, productId)) {
      return res.status(403).json({ error: 'No tienes permiso para modificar este producto' });
    }

    // Implementar la lógica para modificar el producto
  },
  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    const user = req.user; // Suponiendo que tienes el usuario autenticado en req.user

    if (!canDeleteProduct(user, productId)) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este producto' });
    }

    // Implementar la lógica para eliminar el producto
  },
  // Agrega más controladores según sea necesario
};

export default productsController;
