import express from 'express';
import { saveChatMessageToMongoDB } from '../dao/Models/ChatModel.js'; // Ajusta la ruta según tu estructura

const router = express.Router();

const chatRouter = (io) => {
  router.get('/', (req, res) => {
    res.render('chat');
  });

  // Manejar conexiones WebSocket para el chat
  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado en el chat');

    socket.on('chatMessage', async (message) => {
      // Guardar el mensaje en MongoDB
      await saveChatMessageToMongoDB({ user: 'NombreUsuario', message });
      // Emitir el mensaje a todos los clientes en el chat
      io.emit('chatMessage', { user: 'NombreUsuario', message });
    });
  });

  return router;
};

export default chatRouter;
