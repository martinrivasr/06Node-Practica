import User from '../models/users.js'

export function index(req, res, next){
    res.locals.error = ''
    res.locals.email = ''
    res.render('login')
}

export async function postLogin (req, res, next){
    console.log(req.body)
    const{ email, password } = req.body


    // buscar el usuario en la base de datos.
    
    const user = await User.findOne({email: email.toLowerCase()})
    console.log('usuario a autenticar : ', user)
    
    // sino lo encuentro, o la contraseña no coincide --> Error
    
    if(!user || !(await user.comparePassword(password)) ){
        res.locals.error = 'invalid credentials'
        res.locals.email = email
        res.render('login')
        return
    }
    
      // si el usuario existe y la contraseña coincide   --> apuntar en su sesion, que esta logado
   // req.session.userID = user._id
    //req.session.userName = user.email
    //<<> redirect a la home
    console.log('usuario autenticado')
    res.redirect('/')

}

