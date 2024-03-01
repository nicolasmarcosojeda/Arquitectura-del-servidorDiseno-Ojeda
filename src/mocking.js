import faker from 'faker';
import productsModel from './Models/productsModel.js';

const generateMockProducts = async () => {
  try {
    // Generar 100 productos ficticios utilizando faker
    const mockProducts = Array.from({ length: 100 }, () => ({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
    }));

    // Guardar los productos ficticios en la base de datos (o cualquier otra lógica que desees)
    await productsModel.create(mockProducts);

    return { message: 'Productos ficticios generados con éxito' };
  } catch (error) {
    console.error('Error al generar productos ficticios:', error);
    throw new Error('Error interno al generar productos ficticios');
  }
};

export default generateMockProducts;
