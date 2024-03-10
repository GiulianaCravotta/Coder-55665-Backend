const { Router } = require("express");
const Message = require('../dao/db/models/message.js');
const routerMessage = Router();

// Manejar el envío de un nuevo mensaje
routerMessage.post('/', async (req, res) => {
    try {
        const { user, message } = req.body;
        const newMessage = new Message({ user, message });
        await newMessage.save();
        res.status(201).json({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener todos los mensajes
routerMessage.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = routerMessage;
