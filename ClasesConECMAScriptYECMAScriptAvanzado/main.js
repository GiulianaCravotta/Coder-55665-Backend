import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();

// arreglo vacío
console.log(productManager.getProducts());

// agregar productos
productManager.addProduct({ title: "Producto 1", description: "Producto Prueba 1", price: 123, thumbnail: "Sin imagen", code: 543, stock: 10 });
productManager.addProduct({ title: "Producto 2", description: "Producto Prueba 2", price: 123, thumbnail: "Sin imagen", code: 541, stock: 10 });

// getProducts después de agregar un producto
console.log(productManager.getProducts());

// addProduct con el code repetido 
productManager.addProduct({ title: "Prod2", description: "Producto Prueba 2 repetido", price: 123, thumbnail: "Sin imagen", code: 541, stock: 10 });

//getProductById devuelve error si no encuentra el producto
const notFoundProduct = productManager.getProductById(3);

// getProductById devuelve el producto si lo encuentra
const foundProduct = productManager.getProductById(1);
console.log(`Producto con ID 1:`, foundProduct);