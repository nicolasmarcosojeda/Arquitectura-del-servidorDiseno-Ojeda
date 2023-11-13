const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
  }

  // Agregar un producto
  addProduct(product) {
    this.products.push(product);
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
    }
  }

  // Eliminar un producto por su ID
  removeProductById(productId) {
    this.products = this.products.filter((product) => product.id !== productId);
  }

  // Obtener todos los productos
  getAllProducts() {
    return this.products;
  }

  // Guardar productos en un archivo
  saveToFile(filename) {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(filename, data);
  }

  // Cargar productos desde un archivo
  loadFromFile(filename) {
    try {
      const data = fs.readFileSync(filename, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
  }
}

// Uso de la clase ProductManager
const manager = new ProductManager();

// Cargar productos desde un archivo existente
manager.loadFromFile('productos.json');

// Agregar productos
manager.addProduct({ id: 1, title: "iPhone 13", price: 999.99, thumbnail: "iphone13.jpg", code: "IP13", stock: 50 });
manager.addProduct({ id: 2, title: "Samsung Galaxy S21", price: 899.99, thumbnail: "s21.jpg", code: "S21", stock: 40 });
manager.addProduct({ id: 3, title: "Google Pixel 6", price: 799.99, thumbnail: "pixel6.jpg", code: "PIX6", stock: 30 });
manager.addProduct({ id: 4, title: "OnePlus 9 Pro", price: 849.99, thumbnail: "oneplus9.jpg", code: "OP9", stock: 20 });
manager.addProduct({ id: 5, title: "Xiaomi Mi 11", price: 699.99, thumbnail: "mi11.jpg", code: "MI11", stock: 60 });

// Consultar un producto por ID
const productById = manager.getProductById(3);
console.log("Producto encontrado por ID:", productById);

// Modificar un producto por ID
manager.updateProduct(3, { price: 899.99 });

// Eliminar un producto por ID
manager.removeProductById(4);

// Obtener todos los productos
const allProducts = manager.getAllProducts();
console.log("Todos los productos:", allProducts);

// Guardar los productos en un archivo al finalizar
manager.saveToFile('productos.json');
