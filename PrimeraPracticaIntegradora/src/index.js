const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const routerProd = require('./routes/products.routes.js');
const routerCart = require('./routes/cart.routes.js');
const messageRouter = require('./routes/message.routes.js');

const port = 8080;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/products', routerProd);
app.use('/api/cart', routerCart);

//Handlebars
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.get('/chat', (req, res) => {
    res.render('chat');
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});
