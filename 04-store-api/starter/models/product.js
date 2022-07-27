const mongoose = require('mongoose')

// the structure of my product page
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'product name must be provided']
    },
    price: {
        type: Number,
        required:[true, 'product price must be provided']
    },
    featured: {
        type: Boolean,
        default:false
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
      type: String,
      enum:{
          values:  ['ikea', 'liddy', 'caressa', 'marcos'],
          // allows the access to the value the user is providing
          message: '{VALUE} is not supported',
      },
    //   emun: ['ikea', 'liddy', 'caressa', 'marcos'],  
    }
})

module.exports = mongoose.model('Product', productSchema)
