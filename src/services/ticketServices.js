import TicketModel from './models/ticketModel.js';

const ticketServices = {
  async createTicket(ticketData) {
    try {
      const ticket = new TicketModel(ticketData);
      await ticket.save();
      return ticket;
    } catch (error) {
      throw new Error('Error al crear el ticket: ' + error.message);
    }
  },

  async getTicketByCode(ticketCode) {
    try {
      const ticket = await TicketModel.findOne({ code: ticketCode });
      return ticket;
    } catch (error) {
      throw new Error('Error al obtener el ticket: ' + error.message);
    }
  },

  async updateTicket(ticketCode, updatedTicketData) {
    try {
      const ticket = await TicketModel.findOneAndUpdate({ code: ticketCode }, updatedTicketData, { new: true });
      return ticket;
    } catch (error) {
      throw new Error('Error al actualizar el ticket: ' + error.message);
    }
  },

  async deleteTicket(ticketCode) {
    try {
      await TicketModel.findOneAndDelete({ code: ticketCode });
      return true;
    } catch (error) {
      throw new Error('Error al eliminar el ticket: ' + error.message);
    }
  },
};

export default ticketServices;
