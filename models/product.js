const mongoose = require('mongoose')

const Product = mongoose.model('Product',{
    title:{
        type : String
    },
    descripton:{
        type : String
    },
    price:{
        type : Number
    },
    Image : {
        type : String
    }
})

module.exports = Product;