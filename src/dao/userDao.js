import UserModel from '../models/UserModel.js';

class UserDao {
  async createUser(userData) {
    try {
      const user = new UserModel(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Error al crear usuario: ' + error.message);
    }
  }

  async getUserById(userId) {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      throw new Error('Error al obtener usuario por ID: ' + error.message);
    }
  }

  async updateUser(userId, updatedUserData) {
    try {
      const user = await UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
      return user;
    } catch (error) {
      throw new Error('Error al actualizar usuario: ' + error.message);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await UserModel.findByIdAndDelete(userId);
      return user;
    } catch (error) {
      throw new Error('Error al eliminar usuario: ' + error.message);
    }
  }
}

export default UserDao;
