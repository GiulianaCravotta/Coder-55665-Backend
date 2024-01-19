const { Router } = require("express");
const CartManager = require("../models/CartManager.js");

const routerCart = Router();
const cartManager = new CartManager('../data/carrito.json');

routerCart.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart();
        res.status(201).json({ message: 'Carrito creado', cartId: cart.id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

routerCart.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);

        if (cart) {
            res.status(200).json(cart.products);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

routerCart.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const success = await cartManager.addToCart(cid, pid);

        if (success) {
            res.status(200).json({ message: 'Producto agregado al carrito' });
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar producto al carrito' });
    }
});

module.exports = routerCart;