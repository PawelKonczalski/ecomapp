const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        text: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        text: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    subs: [{
        type: ObjectId,
        ref: 'Sub'
    }],
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    shipping: {
        type: String,
        enum: ['YES', 'NO']
    },
    language: {
        type: String,
        enum: ['english', 'german', 'polish', 'italian', 'spanish']
    },
    brand: {
        type: String,
        enum: ['animals', 'architecture', 'nature', 'people', 'tech']
    },
},
    {timestamps: true})

module.exports = mongoose.model('Product', productSchema)