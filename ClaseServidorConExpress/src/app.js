const express = require('express')
const ProductManager = require('./ProductManager3')
const app = express()
const port = 8080;

const productManager = new ProductManager

app.get('/', (req, res) => {
    res.send('Bienvenido al Ecommerce')
});

app.get('/products', async(req, res) => {
    try{
        const limit = req.query.limit;
        const products = productManager.getProducts(limit);
        res.json(products);    
    }catch{
        res.status(500).json({error: 'Error al obtener productos'})
    }
});

app.get('/products/:pid', async(req, res) => {
    try{
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({error:'Producto no encontrado'})
        }
    }catch{
        res.status(500).json({error: 'Error al obtener el producto'})
    }
});
app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})