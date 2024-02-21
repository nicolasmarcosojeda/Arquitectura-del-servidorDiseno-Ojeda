import Ticket from '../models/ticket.js';

const ticketDao = {
  async createTicket(ticketData) {
    try {
      const ticket = new Ticket(ticketData);
      await ticket.save();
      return ticket;
    } catch (error) {
      throw new Error('Error creating ticket: ' + error.message);
    }
  },

  async getTicketById(ticketId) {
    try {
      const ticket = await Ticket.findById(ticketId);
      return ticket;
    } catch (error) {
      throw new Error('Error getting ticket by ID: ' + error.message);
    }
  },

  async updateTicket(ticketId, updatedTicketData) {
    try {
      const ticket = await Ticket.findByIdAndUpdate(ticketId, updatedTicketData, { new: true });
      return ticket;
    } catch (error) {
      throw new Error('Error updating ticket: ' + error.message);
    }
  },

  async deleteTicket(ticketId) {
    try {
      await Ticket.findByIdAndDelete(ticketId);
    } catch (error) {
      throw new Error('Error deleting ticket: ' + error.message);
    }
  }
};

export default TicketDAO;
