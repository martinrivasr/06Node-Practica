import express from 'express';
import { upload } from '../controllers/imageController.js';

const router = express.Router();

router.post('/upload', upload.single('imagen'), (req, res) => {
    // Aquí manejaremos la subida de la imagen a Cloudinary en el siguiente paso.
    res.send('Imagen recibida');
});

export default router;
