import cloudinary from './cloudinaryConfig.js';

export async function subirImagen(rutaImagen) {
    try {
        const resultado = await cloudinary.v2.uploader.upload(rutaImagen, {
            folder: "nombre-de-la-carpeta-en-cloudinary" // Opcional: especifica una carpeta
        });
        return resultado.secure_url; // Devuelve la URL de la imagen subida
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
    }
}
