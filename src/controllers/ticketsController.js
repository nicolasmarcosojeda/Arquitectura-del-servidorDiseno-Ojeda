import TicketDAO from '../dao/ticketDao.js';
import TicketDTO from '../dto/ticketDto.js';
import errorMessages from './errorMessages.js';


const ticketsController = {
  async purchaseCart(req, res) {
    try {
      const cartId = req.params.cid;
      // Aquí puedes obtener los detalles del carrito y otros datos necesarios para la compra

      // Realizar la compra y obtener el ticket generado
      const ticket = await TicketDAO.purchaseCart(cartId);

      // Si la compra se realizó con éxito, devuelve el ticket generado
      res.status(200).json(ticket);
    } catch (error) {
      // Si ocurre algún error durante el proceso de compra, devuelve un mensaje de error
      console.error('Error purchasing cart:', error);
      res.status(500).json({ error: 'Error purchasing cart' });
    }
  }
};

export default ticketsController;
