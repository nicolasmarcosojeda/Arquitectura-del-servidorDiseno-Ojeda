import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  user: String,
  message: String,
});

const ChatModel = mongoose.model('ChatMessage', chatSchema);

export async function saveChatMessageToMongoDB(message) {
  try {
    await ChatModel.create(message);
  } catch (error) {
    console.error('Error al guardar el mensaje en MongoDB:', error);
  }
}

export default ChatModel;
