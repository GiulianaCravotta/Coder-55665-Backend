class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }
        if (this.products.some(p => p.code === product.code)) {
            console.error("Ya existe un producto con el mismo código");
            return;
        }
        const newProduct = {
            id: this.productIdCounter++,
            ...product
        };
        this.products.push(newProduct);
        console.log(`Se ha agregado el producto ${newProduct.title}`);
    }
    getProducts() {
        return this.products;
    }
    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error(`Producto no encontrado con el id: ${id}`);
            return;
        }
        return product;
    }
}
export default ProductManager;
