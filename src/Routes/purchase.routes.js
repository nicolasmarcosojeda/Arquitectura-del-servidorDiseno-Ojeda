// Importa express y otros módulos necesarios
import express from 'express';
import Ticket from '../models/Ticket.js'; // Importa el modelo de Ticket
import { generateTicket } from '../services/ticketService.js'; // Importa el servicio de Tickets

// Crea una instancia del enrutador de express
const router = express.Router();

// Ruta para finalizar el proceso de compra
router.post('/:cid/purchase', async (req, res) => {
  try {
    const userId = req.session.user.id; // Obtener el ID del usuario desde la sesión
    const cartId = req.params.cid; // Obtener el ID del carrito desde los parámetros de la ruta

    // Lógica para finalizar la compra (ajustar según tus necesidades)
    // Esto puede incluir verificar el stock de los productos, generar un ticket, etc.
    
    // Generar el ticket con los detalles de la compra
    const ticket = await generateTicket(userId, cartId);

    // Devolver el ticket como respuesta
    res.json({ status: 'success', ticket: ticket });
  } catch (error) {
    console.error('Error al finalizar la compra:', error);
    res.status(500).json({ status: 'error', error: 'Error interno del servidor', details: error.message });
  }
});

export default router;
