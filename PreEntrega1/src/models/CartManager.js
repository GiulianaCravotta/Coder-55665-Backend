const fs = require('fs').promises;
class CartManager {
    constructor() {
        this.cartPath = '../data/cartProducts.json';
        this.cart = [];
        this.cartIdCounter = 1;
    }
    async createCart() {
        const newCart = {
            id: this.cartIdCounter++,
            products: []
        };
        this.cart.push(newCart);
        await this.saveCarts();
        console.log(`Nuevo carrito creado con id ${newCart.id}`);
        return newCart;
    }

    async getCartById(cartId) {
        const cart = this.cart.find(c => c.id === cartId);
        if (!cart) {
            console.error(`Carrito no encontrado con el id: ${cartId}`);
            return null;
        }
        return cart;
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await this.getCartById(cartId);
        if (!cart) {
            console.error(`Carrito no encontrado con el id: ${cartId}`);
            return;
        }

        const existingProduct = cart.products.find(p => p.product === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await this.saveCarts();
        console.log(`Producto agregado al carrito con id ${cartId}`);
    }
    async saveCarts() {
        try {
            const data = JSON.stringify({ carts: this.cart }, null, 2);
            await fs.writeFileSync(this.cartPath, data, 'utf8');
        } catch (error) {
            console.error('Error al guardar productos en el carrito:', error.message);
        }
    }
}

module.exports = CartManager;
