import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  // Define tu esquema para el mensaje aquí
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
