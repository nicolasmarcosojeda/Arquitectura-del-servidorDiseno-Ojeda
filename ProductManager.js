class ProductManager {
    constructor() {
      this.products = [];
    }
  
    // Agregar un producto a la lista
    addProduct(product) {
      this.products.push(product);
    }
  
    // Obtener un producto por su código
    getProduct(productCode) {
      return this.products.find((product) => product.code === productCode);
    }
  
    // Obtener un producto por su ID
    getProductById(productId) {
      const product = this.products.find((p) => p.id === productId);
      if (!product) {
        console.error("Producto no encontrado");
      }
      return product;
    }
  
    // Eliminar un producto por su código
    removeProductByCode(productCode) {
      this.products = this.products.filter((product) => product.code !== productCode);
    }
  
    // Obtener todos los productos
    getAllProducts() {
      return this.products;
    }
  }
  
  const manager = new ProductManager();
  
  manager.addProduct({ id: 1, title: "iPhone 15", price: 999.99, thumbnail: "iphone15.jpg", code: "IP15", stock: 50 });
  manager.addProduct({ id: 2, title: "Samsung Galaxy S23", price: 899.99, thumbnail: "s23.jpg", code: "S23", stock: 40 });
  manager.addProduct({ id: 3, title: "Google Pixel 6", price: 799.99, thumbnail: "pixel6.jpg", code: "PIX6", stock: 30 });
  manager.addProduct({ id: 4, title: "OnePlus 9 Pro", price: 849.99, thumbnail: "oneplus9.jpg", code: "OP9", stock: 20 });
  manager.addProduct({ id: 5, title: "Xiaomi Mi 11", price: 699.99, thumbnail: "mi11.jpg", code: "MI11", stock: 60 });
  
  const allProducts = manager.getAllProducts();
  console.log("Todos los productos:", allProducts);
  
  // Obtener un producto por ID
  const productById = manager.getProductById(3);
  console.log("Producto encontrado por ID:", productById);
  