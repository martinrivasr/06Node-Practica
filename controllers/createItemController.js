import mongoose from 'mongoose'
import Product from '../models/products.js'
import Tag from '../models/tag.js'; //


export function index(req, res, next){
    res.render('createItem')
}

export async function postNew(req, res, next) {
    try {
      const userId = req.session.userID
      console.log('entro a postnew', userId)
      const { product, precio, picture, tags } = req.body;
      const pictureUrl = `http://localhost:3000/uploads/${picture}`; // Ajusta la ruta según la ubicación de tus archivos
      console.log("Data received:", product, precio, picture, tags, pictureUrl);
      // TODO validaciones
      console.log('entro a grabar')

      const tagIds = await Tag.find({ tagname: { $in: tags } }).select('_id'); 
        
      // Extrae solo los ObjectId de los resultados
      const tagObjectIds = tagIds.map(tag => tag._id);
      console.log("Data received tags ", tagObjectIds);

      // creo una instancia de agente en memoria
      const newProduct  = new Product({
        product,
        precio,
        picture: pictureUrl, 
        tags: tagObjectIds,
        owner: userId
      })
      console.log('newProduct', newProduct)
      // la guardo en base de datos
      await newProduct .save()
      console.log('ya grabe')
      console.log('Redirigiendo a /user-items')
      return res.redirect('/user-items')
    } catch (err) {
      next(err)
    }
  }