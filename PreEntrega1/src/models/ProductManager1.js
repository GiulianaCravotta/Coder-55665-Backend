const fs = require('fs').promises;
const path = require('path');
class ProductManager {
    constructor(filePath) {
        this.path = path.resolve(__dirname, filePath);
        this.products = [];
        this.productIdCounter = 1;
    }

    async addProduct(product) {
        try {
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
            await this.saveProducts();
            console.log(`Se ha agregado el producto ${newProduct.title}`);
        } catch {
            console.error('Error al agregar el producto:', error.message);
        }
    }
    getProducts(limit) {
        let result = this.products;
        if (limit) {
            result = this.products.slice(0, limit)
        }
        return result;
    }
    async getProductById(id) {
        try {
            id = parseInt(id);
            const product = this.products.find(p => p.id === id);
            if (!product) {
                console.error(`Producto no encontrado con el id: ${id}`);
                return null;
            }
            return product;
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error.message);
            throw error;
        }
    }
    async updateProduct(id, updatedFields) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error(`Producto no encontrado con el id: ${id}`);
            return false;
        }

        this.products[index] = {
            ...this.products[index],
            ...updatedFields
        };
        await this.saveProducts();
        console.log(`Producto actualizado con éxito`);
        return true;
    }
    async deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error(`Producto no encontrado con el id: ${id}`);
            return;
        }

        this.products.splice(index, 1);
        await this.saveProducts();
        console.log(`Producto id ${id} eliminado con éxito`);
    }
    async saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            await fs.writeFile(this.path, data, 'utf8');
        } catch (error) {
            console.error('Error al guardar productos en el archivo:', error.message);
        }
    }
}

module.exports = ProductManager;

