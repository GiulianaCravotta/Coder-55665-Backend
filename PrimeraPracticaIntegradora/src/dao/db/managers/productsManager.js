//
const ProductModel = require('../models/productModel.js');
class ProductManager {
    constructor() {
        this.ProductModel = ProductModel;
        this.productIdCounter = 1;
        this.initProductIdCounter();
    }

    async initProductIdCounter() {
        try {
            const products = await this.ProductModel.find({});
            if (products.length > 0) {
                this.productIdCounter = Math.max(...products.map(p => p.id)) + 1;
            }
        } catch (error) {
            console.error('Error al inicializar el contador de ID:', error.message);
        }
    }

    async addProduct(product) {
        try {
            const existingProduct = await this.ProductModel.findOne({ code: product.code });

            if (existingProduct) {
                return false;
            } else {
                product.id = this.productIdCounter;
                this.productIdCounter++;
                const newProduct = new this.ProductModel(product);
                await newProduct.save();
                return true;
            }
        } catch (error) {
            console.error('Error agregando producto:', error.message);
            throw error;
        }
    }

    async getProducts() {
        try {
            const products = await this.ProductModel.find({});
            return products;
        } catch (error) {
            console.error('Error obteniendo productos:', error.message);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            id = parseInt(id);
            const product = await this.ProductModel.findOne({ id: id });
            return product;
        } catch (error) {
            console.error('Error obteniendo producto por id:', error.message);
            throw error;
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const product = await this.ProductModel.findOneAndUpdate({ id: id }, updatedProduct, { new: true });
            return !!product;
        } catch (error) {
            console.error('Error actualizando producto:', error.message);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const product = await this.ProductModel.findOneAndDelete({ id: id });
            return !!product;
        } catch (error) {
            console.error('Error eliminado producto:', error.message);
            throw error;
        }
    }
}

module.exports = ProductManager;
