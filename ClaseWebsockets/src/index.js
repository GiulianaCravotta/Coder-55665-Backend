const express = require('express');
const __dirname = require('./path.js');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const path = require('path');
const routerProd = require('./routes/products.routes.js');
const routerCart = require('./routes/cart.routes.js');
const viewsRouter = require('./routes/views.routes.js');

const port = 8080;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use('/api/products', routerProd);
app.use('/api/cart', routerCart);


//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.__dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));//js y css
app.use('/', viewsRouter);

//Websockets
const socketServer = new Server(httpServer);
//Websockets conecciones
socketServer.on('connection', (socket) => {
    console.log("Usuario conectado");

    socket.on('createProduct', (newProduct) => {
        console.log('Nuevo producto creado:', newProduct);
        socketServer.emit('productoCreado', newProduct);
        socketServer.emit('updateRealTimeProductsView', updatedProducts);
    });
    socket.on('eliminateProduct', (product) => {
        console.log('Producto eliminado:', product);
        socketServer.emit('productoEliminado', product);
        socketServer.emit('updateRealTimeProductsView', updatedProducts);
    });
    socket.on('addToCart', ({ cartId, productId }) => {
        console.log(`Product ${productId} added to cart ${cartId}`);
        socketServer.emit('productoAddedToCart', { cartId, productId });
    });
})

const httpServer = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})