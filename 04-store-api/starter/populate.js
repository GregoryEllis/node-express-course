require('dotenv').config()

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json')


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log('Success!!!') 
        // means everything went well
        // If everything went well. When navigating back to the DB the products should be still there.
        process.exit(0) 
    } catch (error) {
        console.log(error)
        // 1 means error occured
        process.exit(1)
    }
}

start()