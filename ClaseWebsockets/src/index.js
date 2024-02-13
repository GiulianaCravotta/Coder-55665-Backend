const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const path = require('path');
const routerProd = require('./routes/products.routes.js');
const routerCart = require('./routes/cart.routes.js');
const viewsRouter = require('./routes/views.routes.js');
const ProductManager = require('./models/ProductManager.js');

const port = 8080;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', routerProd);
app.use('/api/cart', routerCart);
app.use('/realtimeproducts', viewsRouter);

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', viewsRouter);

const httpServer = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Websockets
const socketServer = new Server(httpServer);
const productManager = new ProductManager('../data/products.json');
// Websockets connections
socketServer.on('connection', (socket) => {
    console.log("Usuario conectado");
    socket.on('createProduct', (newProduct) => {
        console.log('Nuevo producto creado:', newProduct);
        productManager.addProduct(newProduct);
        socketServer.emit('createProduct', newProduct);
    });
    socket.on('deleteProduct', (productId) => {
        console.log('Producto eliminado:', productId);
        productManager.deleteProduct(productId);
        socketServer.emit('deleteProduct', productId);
    });
});