const { Router } = require("express");
const ProductManager = require('../models/ProductManager1.js');

const routerProd = Router();
const productManager = new ProductManager('../data/products.json');

routerProd.get('/', async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    res.status(200).json(products);
});

routerProd.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await productManager.getProductById(id);
    if (product) {
        res.status(200).send(product)
    } else {
        res.status(404).send("Producto no encontrado")
    }
})

routerProd.post('/', async (req, res) => {
    try {
        await productManager.addProduct(req.body);
        res.status(201).send("Producto creado");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

routerProd.put('/:id', async (req, res) => {
    const { id } = req.params;
    const conf = await productManager.updateProduct(parseInt(id), req.body);
    if (conf) {
        res.status(200).send("Producto actualizado");
    } else {
        res.status(404).send("No se ha encontrado el producto");
    }
});

routerProd.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const conf = await productManager.deleteProduct(parseInt(id));
    if (conf) {
        res.status(200).send("Producto eliminado");
    } else {
        res.status(404).send("No se ha encontrado el producto");
    }
});

module.exports = routerProd;
