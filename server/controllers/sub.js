const Sub = require('../models/sub')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        const {name, parent} = req.body
        res.json(await new Sub({name, parent, slug: slugify(name)}).save())
    } catch (err) {
        res.status(400).send('Create sub-category failed')
    }
}

exports.list = async (req, res) => {
    res.json(await Sub.find({}).sort({createdAt: -1}).exec())
}

exports.read = async (req, res) => {
    res.json(await Sub.findOne({slug: req.params.slug}).exec())
}

exports.update = async (req, res) => {
    const {name, parent} = req.body
    try {
        res.json(await Sub.findOneAndUpdate({slug: req.params.slug}, {name, parent, slug: slugify(name)}, {new: true}))
    } catch (err) {
        res.status(400).send('Sub-category update failed')
    }
}

exports.remove = async (req, res) => {
    try {
        res.json(await Sub.findOneAndDelete({slug: req.params.slug}))
    } catch (err) {
        res.status(400).send('Sub-category delete failed')
    }
}
