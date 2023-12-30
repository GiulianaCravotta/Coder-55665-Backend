const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.productIdCounter = 1;

        // carga los productos
        this.loadProducts();
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
        this.saveProducts();
        console.log(`Se ha agregado el producto ${newProduct.title}`);
    }
    getProducts() {
        return this.products;
    }
    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error(`Producto no encontrado con el id: ${id}`);
            return null;
        }
        return product;
    }
    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error(`Producto no encontrado con el id: ${id}`);
            return;
        }

        this.products[index] = {
            ...this.products[index],
            ...updatedFields
        };
        this.saveProducts();
        console.log(`Producto actualizado con éxito`);
    }
    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error(`Producto no encontrado con el id: ${id}`);
            return;
        }

        this.products.splice(index, 1);
        this.saveProducts();
        console.log(`Producto id ${id} eliminado con éxito`);
    }
    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.productIdCounter = Math.max(...this.products.map(p => p.id)) + 1;
            }
        } catch (error) {
            this.products = [];
        }
    }
    saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data, 'utf8');
        } catch (error) {
            console.error('Error al guardar productos en el archivo:', error.message);
        }
    }
}

module.exports = ProductManager;
