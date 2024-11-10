import assert from 'node:assert';
import Product from '../models/products.js';
import User from '../models/users.js';
import Tag from '../models/tag.js';

export async function index(req, res, next){
    try {
        const products = await Product.find().populate('owner tags');
        console.log('datos de sesion en homecontroller', req.session)
        res.locals.session = req.session
        res.render('useritems', { products })
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        res.status(500).send('Error obteniendo productos');
    }
}