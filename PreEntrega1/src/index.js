const express = require('express');
const routerProd = require('./routes/products.routes.js');
const routerCart = require('./routes/cart.routes.js');


const port = 8080;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/products', routerProd);
app.use('/api/cart', routerCart);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
