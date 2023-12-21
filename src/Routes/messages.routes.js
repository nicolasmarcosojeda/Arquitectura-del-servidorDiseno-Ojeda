import express from 'express';
const router = express.Router();
import { MessageService } from '../services/messagesService.js';

const messagesService = new MessageService();

// Ruta para obtener todos los mensajes
router.get('/', async (req, res) => {
  try {
    const messages = await messagesService.getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});

// Ruta para agregar un nuevo mensaje
router.post('/', async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = await messagesService.addMessage(user, message);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el mensaje' });
  }
});

export default router;
