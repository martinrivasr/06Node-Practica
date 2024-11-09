import multer from 'multer';

// Configuración de multer para almacenar archivos temporalmente en la carpeta 'uploads'
const upload = multer({ dest: 'uploads/' });

export { upload };
