import UserModel from './models/userModel.js';

const userServices = {
  async createUser(userData) {
    try {
      const user = new UserModel(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error.message);
    }
  },

  async getUserByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      throw new Error('Error al obtener el usuario por email: ' + error.message);
    }
  },

  async updateUserByEmail(email, updatedUserData) {
    try {
      const user = await UserModel.findOneAndUpdate({ email }, updatedUserData, { new: true });
      return user;
    } catch (error) {
      throw new Error('Error al actualizar el usuario por email: ' + error.message);
    }
  },

  async deleteUserByEmail(email) {
    try {
      await UserModel.findOneAndDelete({ email });
      return true;
    } catch (error) {
      throw new Error('Error al eliminar el usuario por email: ' + error.message);
    }
  },
};

export default userServices;
