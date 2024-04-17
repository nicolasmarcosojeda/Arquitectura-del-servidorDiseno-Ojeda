import multer from 'multer';
import path from 'path';

// Configuración de Multer para guardar archivos en carpetas diferentes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = '';
    if (file.mimetype.startsWith('image')) {
      uploadPath = path.join(__dirname, '../uploads/profiles/');
    } else if (file.mimetype.startsWith('application/pdf')) {
      uploadPath = path.join(__dirname, '../uploads/documents/');
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
