import express from 'express';
import User from './models/UsersModel.js';
import upload from '../config/multerConfig.js'; // Importa el middleware Multer
import { authorizeRole } from '../middlewares/authorizationMiddleware.js'; // Middleware de autorización
import { body } from 'express-validator'; // Para validación de entrada

const router = express.Router();

// Ruta para subir documentos de usuario
router.post(
  '/:uid/documents',
  [
    body('name').notEmpty().withMessage('El nombre del documento es obligatorio'),
    upload.single('document'),
  ],
  async (req, res, next) => {
    try {
      const userId = req.params.uid;
      const documentName = req.body.name;
      const documentReference = req.file.filename; // Nombre del archivo guardado por Multer

      // Encuentra al usuario por su ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Agrega el documento al array de documentos del usuario
      user.documents.push({ name: documentName, reference: documentReference });

      // Guarda los cambios en el usuario
      await user.save();

      return res.status(200).json({ status: 'success', message: 'Documento subido exitosamente' });
    } catch (error) {
      console.error('Error al subir el documento:', error);
      next(error);
    }
  }
);

// Ruta para actualizar el estado de un usuario a premium
router.put('/premium/:uid', authorizeRole('admin'), async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];

    // Encuentra al usuario por su ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }

    // Verifica si el usuario ha cargado todos los documentos requeridos
    const hasAllDocuments = requiredDocuments.every((doc) =>
      user.documents.some((d) => d.name === doc)
    );

    if (!hasAllDocuments) {
      return res
        .status(400)
        .json({ status: 'error', message: 'El usuario debe cargar todos los documentos requeridos' });
    }

    // Actualiza el estado del usuario a premium
    user.role = 'premium';
    await user.save();

    return res.status(200).json({ status: 'success', message: 'Usuario actualizado a premium' });
  } catch (error) {
    console.error('Error al actualizar usuario a premium:', error);
    next(error);
  }
});

// Manejo de errores
router.use((err, req, res, next) => {
  console.error('Manejo de error en el router de usuarios:', err);
  res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
});

export default router;
