import Message from '../dao/models/Message.js';

class MessageService {
  async getAllMessages() {
    const messages = await Message.find();
    return messages;
  }

  async addMessage(user, message) {
    const newMessage = new Message({ user, message });
    await newMessage.save();
    return newMessage;
  }
}

export { MessageService };
