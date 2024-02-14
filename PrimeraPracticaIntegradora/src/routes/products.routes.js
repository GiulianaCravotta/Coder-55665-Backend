const { Router } = require("express");
const Product = require('../dao/db/models/productModel'); 
const mongoose = require('mongoose');

const routerProd = Router();

// get todos los productos
routerProd.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        let query = Product.find(); 
        if (limit) {
            query = query.limit(parseInt(limit, 10)); 
        }
        const products = await query.exec();
        res.status(200).send(products);
    } catch (error) {
        console.log(`Error al obtener los productos: ${error}`);
        res.status(500).json({error: 'Error al obtener los productos'});
    }
});

// get product por id
routerProd.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).exec();
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        console.log(`Error al obtener el producto: ${error}`);
        res.status(500).send("Error interno del servidor");
    }
});

// post product
routerProd.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Producto creado', productId: product._id });
    } catch (error) {
        console.log(`Error al crear el producto: ${error}`);
        res.status(400).send("Error al crear el producto");
    }
});

// actualizar prod
routerProd.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true }).exec();
        if (updatedProduct) {
            res.status(200).send("Producto actualizado");
        } else {
            res.status(404).send("No se ha encontrado el producto");
        }
    } catch (error) {
        console.log(`Error al actualizar el producto: ${error}`);
        res.status(500).send("Error interno del servidor");
    }
});

// delete
routerProd.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id).exec();
        if (deletedProduct) {
            res.status(200).send("Producto eliminado");
        } else {
            res.status(404).send("No se ha encontrado el producto");
        }
    } catch (error) {
        console.log(`Error al eliminar el producto: ${error}`);
        res.status(500).send("Error interno del servidor");
    }
});

module.exports = routerProd;
