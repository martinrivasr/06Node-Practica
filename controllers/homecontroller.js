import assert from 'node:assert';
import Product from '../models/products.js';
import User from '../models/users.js';
import Tag from '../models/tag.js';

console.log(User);
console.log(Tag);

export async function index(req, res, next){
    try {
        const products = await Product.find().populate('owner tags');
        res.render('home', { products })
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        res.status(500).send('Error obteniendo productos');
    }
}
