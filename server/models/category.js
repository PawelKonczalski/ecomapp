const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    mame: {
        type: String,
        time: true,
        required: 'Name is required',
        minlength: [2, 'Too short'],
        maxlength: [32, 'Too long']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema);