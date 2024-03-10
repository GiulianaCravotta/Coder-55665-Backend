//index.js
const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const routerProd = require('./routes/products.routes.js');
const routerCart = require('./routes/cart.routes.js');
const routerMessage = require('./routes/message.routes.js');
const mongoose = require('mongoose');
const dbConnect = require('./dao/db/managers/db.js');

const port = 8080;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/products', routerProd);
app.use('/api/cart', routerCart);
app.use('/api/messages', routerMessage);

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.get('/chat', (req, res) => {
    res.render('chat');
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    dbConnect.connect()
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
