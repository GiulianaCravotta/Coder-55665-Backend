
const { Router } = require('express');
const router = Router();
const ProductManager = require('../models/ProductManager1.js');
const productManager = new ProductManager('../data/productos.json');
router.get('/home', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        console.error('Error al obtener la lista de productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;

