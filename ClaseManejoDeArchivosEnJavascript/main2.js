const ProductManager = require('./ProductManager2'); 

// archivo JSON
const filePath = './productos.json';

//
const productManager = new ProductManager(filePath);

//arreglo vacio
console.log(productManager.getProducts());

// agregar un producto
productManager.addProduct({ title: "Producto 1", description: "Producto Prueba 1", price: 123, thumbnail: "Sin imagen", code: 543, stock: 10 });

// productos después de agregar uno
console.log('Productos después de agregar uno:', productManager.getProducts());

//producto por ID
const productId = 1; 
const foundProduct = productManager.getProductById(productId);
if(foundProduct !== null){
    console.log(`Producto encontrado con ID ${productId}:`,foundProduct);
}else{
    console.log(`No se encontró el producto con ID ${productId}`);
}

// actualizar un producto
const updatedProductId = 1; 
productManager.updateProduct(updatedProductId, { price: 250, stock: 30 });

// productos después de la actualización
console.log('Productos después de la actualización:', productManager.getProducts());

// eliminar un producto
const deletedProductId = 1; 
productManager.deleteProduct(deletedProductId);

//productos después de la eliminación
console.log('Productos después de la eliminación:', productManager.getProducts());
