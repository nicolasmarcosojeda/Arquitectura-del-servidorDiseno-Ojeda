class TicketDto {
    constructor(ticketData) {
      this.code = ticketData.code;
      this.purchaseDatetime = ticketData.purchaseDatetime;
      this.amount = ticketData.amount;
      this.purchaser = ticketData.purchaser;
    }
  }
  
  export default TicketDto;
  