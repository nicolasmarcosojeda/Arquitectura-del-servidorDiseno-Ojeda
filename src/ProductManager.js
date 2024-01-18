import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class ProductManager {
  constructor() {
    this.products = [];
    this.filename = path.join(__dirname, 'productos.json'); // Utiliza path.join para construir la ruta del archivo
    this.loadFromFile();
  }

  // Agregar un producto
  addProduct(product) {
    this.products.push(product);
    this.saveToFile();
  }

  // Consultar un producto por su ID
  getProductById(productId) {
    const product = this.products.find((p) => p.id === productId);
    return product;
  }

  // Modificar un producto por su ID
  updateProduct(productId, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === productId);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.saveToFile();
    }
  }

  // Eliminar un producto por su ID
  removeProductById(productId) {
    this.products = this.products.filter((product) => product.id !== productId);
    this.saveToFile();
  }

  // Obtener todos los productos
  getAllProducts() {
    return this.products;
  }

  // Guardar productos en un archivo
  saveToFile() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.filename, data);
  }

  // Cargar productos desde un archivo
  loadFromFile() {
    try {
      const data = fs.readFileSync(this.filename, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
  }
}

export { ProductManager };
