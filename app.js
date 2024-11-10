import express from 'express'
import logger from 'morgan'
import createError from 'http-errors'
import imageRoutes from './routes/imageRoutes.js'
import * as homeController  from './controllers/homecontroller.js'
import * as headerController from './controllers/headerController.js'
import * as loginController from './controllers/loginControllers.js'
import * as createItemController from './controllers/createItemController.js'
import * as createUserController from './controllers/createUserController.js'   
import * as userItemController from './controllers/userItemsController.js'
import * as userDataController from './controllers/userDataController.js'
import connectMongoose from './lib/DBConection.js';
import * as sessionManager from './lib/sessionManager.js'



await connectMongoose()

const app = express()

app.locals.appName = 'Nodepop.!!!'

//vistas de ejs
app.set('views','views') // views folder
app.set('view engine', 'ejs')




//app.use(logger('dev'))
//app.use(logger('dev'))
app.use(sessionManager.middleware, sessionManager.useSessionInViews)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use('/', express.static('public'))
app.all('/logout', headerController.logout)


// public pages

app.use('/images', imageRoutes);
app.get('/', homeController.index)
app.get('/login', loginController.index)
app.post('/login', loginController.postLogin)
app.get('/create-user', createUserController.index)
app.get('/create-item', createItemController.index)
app.get('/user-items', userItemController.index)
app.get('/user-data', userDataController.index)


// private  pages
app.get('/items-create', sessionManager.isLogged, createItemController.index)

//Manejo de errores
app.use((req,res,next)=>{
    next (createError(404))
   })


app.use((err, req, res, next) => {
    //validation error
    if(err.array){
        err.message = 'Invalid request: ' + err.array()
        .map(e =>`${e.location} ${e.type} ${e.path} ${e.msg}`)
        .join()
        err.status = 422
    }
    res.status(err.status || 500)
    // set locals. pnly proviing error in developemnt
    res.locals.message = err.message
    res.locals.error = process.env.NODEAPP_ENV === 'development' ? err:{} 

    //res.send('Ocurrio un error ' + err.message)
    res.render('error')
})

export default app