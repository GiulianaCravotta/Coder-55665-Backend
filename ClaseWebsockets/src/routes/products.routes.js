const { Router } = require("express");
const ProductManager = require('../models/ProductManager.js');

const routerProd = Router();
const productManager = new ProductManager('../data/products.json');

routerProd.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const prods = await productManager.getProducts();
        const parsedLimit = parseInt(limit, 10);
        const products = parsedLimit ? prods.slice(0, limit) : prods;
        res.status(200).send(products);
    } catch (error) {
        console.log(`Error al obtener los productos: ${error}`);
        res.status(500).json({error: 'Error al obtener los productos'});
    }
})

routerProd.get('/:id', async (req, res) => {
    const { id } = req.params
    const prod = await productManager.getProductById(id)

    if (prod) {
        res.status(200).send(prod)
    } else {
        res.status(404).send("Producto no encontrado")
    }
})

routerProd.post('/', async (req, res) => {
    try {
        const requiredFields = ['title','description','code','price','stock','category'];
        const missingFields = requiredFields.filter(field  => !req.body[field]);
        if(missingFields.length > 0){
            throw new Error(`Faltan campos requeridos: ${missingFields.join(', ')}`)
        }
        const product = {...req.body, id: productManager.productIdCounter, status: true};
        await productManager.addProduct(product);
        console.log('Producto creado:', product.id);
        res.status(201).json({ message: 'Producto creado', productId: product.id });
    } catch (error) {
        console.log('Error al crear el producto:', error.message);
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
