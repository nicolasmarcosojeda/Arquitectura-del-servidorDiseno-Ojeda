import UserDAO from '../dao/userDao.js';
import UserDTO from '../dto/userDto.js';

const userController = {
  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserDAO.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const userDTO = UserDTO.fromDAO(user);
      res.status(200).json(userDTO);
    } catch (error) {
      console.error('Error getting user by ID:', error);
      res.status(500).json({ error: 'Error getting user by ID' });
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;

      // Verificar si el usuario ha cargado los documentos requeridos
      if (
        !updatedUserData.documents ||
        !updatedUserData.documents.some(doc => doc.name === 'Identificación' && doc.reference) ||
        !updatedUserData.documents.some(doc => doc.name === 'Comprobante de domicilio' && doc.reference) ||
        !updatedUserData.documents.some(doc => doc.name === 'Comprobante de estado de cuenta' && doc.reference)
      ) {
        return res.status(400).json({ error: 'El usuario debe cargar los documentos requeridos' });
      }

      await UserDAO.updateUser(userId, updatedUserData);
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      await UserDAO.deleteUser(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user' });
    }
  }
};

export default userController;
