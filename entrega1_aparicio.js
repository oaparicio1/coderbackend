class ProductManager {
  #products = [];

  getProducts = () => {
    return this.#products;
  }

  addProduct = (product) => {
    if (this.#products.find(p => p.code === product.code)) {
      throw new Error('Product code already exists.');
    }
    const id = this.#generateId();
    this.#products.push({...product, id});
    return id;
  }

  getProductById = (id) => {
    const product = this.#products.find(p => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found.`);
    }
    return product;
  }

  #generateId = () => {
    let id = Math.floor(Math.random() * 1000) + 1;
    while (this.#products.find(p => p.id === id)) {
      id = Math.floor(Math.random() * 1000) + 1;
    }
    return id;
  }
}

const productManager = new ProductManager();
console.log(productManager.getProducts()); 

const newProduct = {
  title: 'test product',
  description: 'This is a test product',
  price: 200,
  thumbnail: 'No image',
  code: 'abc123',
  stock: 25,
};

const newProductId = productManager.addProduct(newProduct);
console.log(newProductId); 
console.log(productManager.getProducts()); 

try {
  productManager.addProduct(newProduct);
} catch (error) {
  console.log(error.message); 
}

const productById = productManager.getProductById(newProductId);
console.log(productById); 

try {
  productManager.getProductById(9999);
} catch (error) {
  console.log(error.message); 
}
