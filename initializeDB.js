import Chance from 'chance';
import bcrypt from 'bcrypt';
import readline from 'node:readline'
import connectMoongose from './lib/DBConection.js'
import User from './models/users.js'
import Product from './models/products.js'
import Tag from './models/tag.js'

const chance = new Chance();

const connection = await connectMoongose()
console.log('Connected to MongoDB: ', connection.name)

const questionResponse = await ask('Are you sure you wnat to empty the database and create inistial data?')

if (questionResponse.toLowerCase() !== 'yes'){
    console.log('Operation aborted.')
    process.exit()
}


const initializeDB = async () => {
    try { 

        //delete all users
        const deleteUsers = await User.deleteMany();
        const deleteProducts = await Product.deleteMany()
        const deleteTags = await Tag.deleteMany()
        
        console.log(`Deleted ${deleteUsers.deletedCount} users`)
        console.log(`Deleted ${deleteProducts.deletedCount} products`)
        console.log(`Deleted ${deleteTags.deletedCount} Tags`)


        // Create the inital data for Tag table
        const tags = await Tag.insertMany([
            { tagname: 'work' },
            { tagname: 'lifestyle' },
            { tagname: 'motor' },
            { tagname: 'mobile'},
        ]);

         // Create random users with hashed passwords
        const users = await Promise.all(
            Array.from({ length: 10 }).map(async () => ({
                email: chance.email(),
                name: chance.name(),
                password: await bcrypt.hash('password123', 10), // Hashing password
                country: chance.country({ full: true }),
            }))
        );

        const insertedUsers = await User.insertMany(users);

        /* Create initial users
        const users = await User.insertMany([
            {
                email: 'admin1@example.com',
                name: 'Jon Ramos.',
                password: 'password123',
                country: 'USA',
            },
            {
                email: 'admin2@example.com',
                name: 'John McDaniel',
                password: 'password123',
                country: 'Canada',
            },
            {
                email: 'admin3@example.com',
                name: 'Landon Hunter',
                password: 'password123',
                country: 'UK',
            },
            {
                email: 'admin4@example.com',
                name: 'Admin4',
                password: 'password123',
                country: 'Mexico',
            },
            {
                email: 'admin5@example.com',
                name: 'Admin5',
                password: 'password123',
                country: 'Germany',
            },
            {
                email: 'admin6@example.com',
                name: 'Admin6',
                password: 'password123',
                country: 'Brazil',
            },
            {
                email: 'admin7@example.com',
                name: 'Admin7',
                password: 'password123',
                country: 'France',
            },
            {
                email: 'admin8@example.com',
                name: 'Admin8',
                password: 'password123',
                country: 'Italy',
            },
            {
                email: 'admin9@example.com',
                name: 'Admin9',
                password: 'password123',
                country: 'Australia',
            },
            {
                email: 'admin10@example.com',
                name: 'Admin10',
                password: 'password123',
                country: 'Japan',
            }
        ]);
            */
        /* create new products
        const products = await Product.insertMany([
            {
                product: 'Laptop',
                precio: 1200,
                picture: 'https://example.com/laptop.jpg',
                tags: [tags[0]._id, tags[1]._id],
                owner: users[0]._id,
            },
            {
                product: 'Bookcase',
                precio: 150,
                picture: 'https://example.com/bookcase.jpg',
                tags: [tags[0]._id, tags[2]._id, tags[3]._id], 
                owner: users[0]._id,
            },
        ]);*/

         // Create products

        const products = [];

         // Users with 1-3 products
        for (let i = 0; i < 5; i++) {
            const numProducts = Math.floor(Math.random() * 3) + 1; 
            for (let j = 0; j < numProducts; j++) {
                const numTags = Math.floor(Math.random() * 4) + 1; 
                const selectedTags = [];
                for (let k = 0; k < numTags; k++) {
                    selectedTags.push(tags[Math.floor(Math.random() * tags.length)]._id);
                }
                products.push({
                    product: `Producto ${i}-${j}`,
                    precio: Math.floor(Math.random() * 2000) + 1, 
                    picture: `https://example.com/producto${i}-${j}.jpg`,
                    tags: selectedTags,
                    owner: insertedUsers[i]._id,
                });
            }
        }

         // Users with 14-20 products
        for (let i = 5; i < 8; i++) {
            const numProducts = Math.floor(Math.random() * 7) + 14; 
            for (let j = 0; j < numProducts; j++) {
                const numTags = Math.floor(Math.random() * 4) + 1; 
                const selectedTags = [];
                for (let k = 0; k < numTags; k++) {
                    selectedTags.push(tags[Math.floor(Math.random() * tags.length)]._id);
                }
                products.push({
                    product: `Producto ${i}-${j}`,
                    precio: Math.floor(Math.random() * 2000) + 1, 
                    picture: `https://example.com/producto${i}-${j}.jpg`,
                    tags: selectedTags,
                    owner: insertedUsers[i]._id,
                });
            }
        }

         // Users with 30 products
        for (let i = 8; i < 10; i++) {
            for (let j = 0; j < 30; j++) {
                const numTags = Math.floor(Math.random() * 4) + 1; 
                const selectedTags = [];
                for (let k = 0; k < numTags; k++) {
                    selectedTags.push(tags[Math.floor(Math.random() * tags.length)]._id);
                }
                products.push({
                    product: `Producto ${i}-${j}`,
                    precio: Math.floor(Math.random() * 2000) + 1, 
                    picture: `https://example.com/producto${i}-${j}.jpg`,
                    tags: selectedTags,
                    owner: insertedUsers[i]._id,
                });
            }
        }

        await Product.insertMany(products);
        
        console.log('DB created successfuly.')
        console.log(`Created ${tags.length} Tags`)
        console.log(`Created ${users.length} Users`)
        console.log(`Created ${products.length} Products`)
        connection.close()

    } catch (error) {
        console.error('Error al inicializar la base de datos:', error)
        connection.close()
    }
};

function ask(questionText){
    return new Promise((resolve,reject)=>{
        const consoleinter = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        }) 
        consoleinter.question(questionText, answer =>{
            consoleinter.close()
            resolve(answer)
        })
    })
}


initializeDB();