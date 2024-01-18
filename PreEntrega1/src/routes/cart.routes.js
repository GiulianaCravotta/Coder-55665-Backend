const { Router } = require("express");
const CartManager = require("../models/CartManager.js");

const routerCart = Router();

routerCart.post('/', async (req, res)=>{
    try{
        const newCart = await CartManager.createCart();
        res.status(201).json(newCart);
    }catch (error){
        res.status(500).json({error: "Error"});
    }
});


routerCart.get('/:pid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await CartManager.getCartById(Number(cid));

        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).send('Carrito no encontrado');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

routerCart.post('/:pid/product', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const updatedCart = await CartManager.addProductToCart(Number(cid), Number(pid), quantity);
        res.status(201).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = routerCart;
