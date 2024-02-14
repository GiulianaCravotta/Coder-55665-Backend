const fs = require('fs').promises;
const path = require('path');
class ProductManager {
    constructor(filePath) {
        this.products = []
        this.filePath = path.resolve(__dirname, filePath);
        this.productIdCounter = 1;
        this.initProductIdCounter();
    }
    async initProductIdCounter() {
        try {
            const products = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
            if (products.length > 0) {
                this.productIdCounter = Math.max(...products.map(p => p.id)) + 1;
            }
        } catch (error) {
            console.error('Error al inicializar el contador de ID:', error.message);
        }
    }
    async addProduct(product) {
        try {
            const products = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
            const productoExistente = products.find(p => parseInt(p.code) === parseInt(product.code));

            if (productoExistente) {
                return false;
            } else {
                product.id = this.productIdCounter;
                this.productIdCounter++;
                products.push(product);
                await fs.writeFile(this.filePath, JSON.stringify(products));
                return true;
            }
        } catch (error) {
            console.error('Error agregando producto:', error.message);
            throw error;
        }
    }

    async getProducts() {
        try {
            const products = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
            return products;
        } catch (error) {
            console.error('Error obteniendo productos:', error.message);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            id = parseInt(id);
            const products = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
            const product = products.find(p => p.id === id);
            return product;
        } catch (error) {
            console.error('Error obteniendo producto por id:', error.message);
            throw error;
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const products = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
            const productIndex = products.findIndex(p => p.id === id);

            if (productIndex !== -1) {
                updatedProduct.id = id;
                products[productIndex] = updatedProduct;
                await fs.writeFile(this.filePath, JSON.stringify(products));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error actualizando producto:', error.message);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const products = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
            const productosFiltrados = products.filter(p => p.id !== id);

            if (productosFiltrados.length < products.length) {
                await fs.writeFile(this.filePath, JSON.stringify(productosFiltrados));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error eliminado producto:', error.message);
            throw error;
        }
    }
}

module.exports = ProductManager;
