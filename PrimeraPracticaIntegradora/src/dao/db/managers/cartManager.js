//cartManager.js
const ProductModel = require('../models/productModel.js');
const CartModel = require('../models/cartModel.js');

class CartManager {
    constructor() {
        this.ProductModel = ProductModel;
        this.CartModel = CartModel;
        this.cartIdCounter = 1;
        this.initCartIdCounter();
    }

    async initCartIdCounter() {
        try {
            const carts = await this.CartModel.find({});
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
            const cart = new this.CartModel({
                id: this.cartIdCounter,
                products: [],
            });

            this.cartIdCounter++;
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error creando un nuevo carrito:', error.message);
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await this.CartModel.findOne({ id: cartId });
            return cart;
        } catch (error) {
            console.error('Error obteniendo carrito por ID:', error.message);
            throw error;
        }
    }

    async addToCart(cartId, productId) {
        try {
            const cart = await this.CartModel.findOne({ id: cartId });

            if (!cart) {
                return false;
            }

            const product = await this.ProductModel.findOne({ id: productId });

            if (!product) {
                return false;
            }

            const existingProduct = cart.products.find(p => p.product === productId);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }

            await cart.save();
            return true;
        } catch (error) {
            console.error('Error agregando producto al carrito:', error.message);
            throw error;
        }
    }
}

module.exports = CartManager;

