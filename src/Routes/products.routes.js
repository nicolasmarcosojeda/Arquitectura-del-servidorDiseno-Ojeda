// Importa express y otros módulos necesarios
import express from 'express';

// Crea una instancia del enrutador de express
const router = express.Router();

// Ruta para visualizar todos los productos con paginación
router.get('/products', async (req, res) => {
  try {
    // Obtiene los parámetros de consulta
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || '';
    const query = req.query.query || '';

    // Lógica para obtener productos (ajusta según tus necesidades)
    const products = await productsModel.find({/* ajusta la consulta según tus necesidades */})
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sort);

    // Calcula información para la paginación
    const totalProducts = await productsModel.countDocuments({/* ajusta la consulta según tus necesidades */});
    const totalPages = Math.ceil(totalProducts / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    // Construye el objeto de respuesta
    const response = {
      status: 'success',
      payload: products,
      totalPages: totalPages,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null,
      page: page,
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage,
      prevLink: hasPrevPage ? `/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
      nextLink: hasNextPage ? `/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
    };

    // Renderiza la vista de productos con paginación (ajusta según tus necesidades)
    res.render('products', { response });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ status: 'error', error: 'Error interno del servidor', details: error.message });
  }
});

// Ruta para visualizar un producto específico
router.get('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Obtiene el producto por su ID
    const product = await productsModel.findById(productId);

    // Renderiza la vista del producto (ajusta según tus necesidades)
    res.render('productDetails', { product });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ status: 'error', error: 'Error interno del servidor', details: error.message });
  }
});

// Exporta el router para ser utilizado en otros archivos
export default router;
