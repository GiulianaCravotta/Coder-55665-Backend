const fs = require('fs').promises;
const path = require('path');
class CartManager {
    constructor(filePath) {
        this.filePath = path.resolve(__dirname, filePath);
        this.cartIdCounter = 1;
        this.initCartIdCounter();
    }
    async initCartIdCounter() {
        try {
            const carts = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
            this.carts = carts || [];
            if (carts.length > 0) {
                this.cartIdCounter = Math.max(...carts.map(cart => cart.id)) + 1;
            }
        } catch (error) {
            console.error('Error al inicializar el contador de ID del carrito:', error.message);
        }
    }

    async createCart() {
        try {
            const cart = {
                id: this.cartIdCounter,
                products: [],
            };

            this.cartIdCounter++;
            this.carts.push(cart);

            await fs.writeFile(this.filePath, JSON.stringify(this.carts));
            return cart;
        } catch (error) {
            console.error('Error creando un nuevo carrito:', error.message);
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            cartId = parseInt(cartId);
            const carts = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
            const cart = carts.find(c => c.id === cartId);
            return cart;
        } catch (error) {
            console.error('Error obteniendo carrito por ID:', error.message);
            throw error;
        }
    }

    async addToCart(cartId, productId) {
        try {
            cartId = parseInt(cartId);
            productId = parseInt(productId);

            const carts = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
            const cart = carts.find(c => c.id === cartId);

            if (!cart) {
                return false;
            }

            const existingProduct = cart.products.find(p => p.product === productId);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }

            await fs.writeFile(this.filePath, JSON.stringify(carts));
            return true;
        } catch (error) {
            console.error('Error agregando producto al carrito:', error.message);
            throw error;
        }
    }
}

module.exports = CartManager;