import User from '../models/users.js';

export function index(req, res, next) {
    res.render('createUser');
}

export async function registerUser(req, res, next) {
    try {
        // Extrae los datos del formulario
        const { username, password, name, country } = req.body;

        // Crea el nuevo usuario
        const newUser = new User({
            email: username, // Usa el campo "username" como "email"
            password: password,
            name: name,
            country: country
        });

        // Guarda el usuario en la base de datos
        await newUser.save();

        // Redirige al usuario a la página de inicio de sesión o a otra página
        res.redirect('/login');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Error al registrar el usuario');
    }
}
