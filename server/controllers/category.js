const Category = require('../models/category')
const Sub = require('../models/sub')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        const {name} = req.body
        res.json(await new Category({name, slug: slugify(name)}).save())
    } catch (err) {
        res.status(400).send('Create category failed')
    }
}

exports.list = async (req, res) => {
    res.json(await Category.find({}).sort({createdAt: -1}).exec())
}

exports.read = async (req, res) => {
    res.json(await Category.findOne({slug: req.params.slug}).exec())
}

exports.update = async (req, res) => {
    const {name} = req.body
    try {
        res.json(await Category.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true}))
    } catch (err) {
        res.status(400).send('Category update failed')
    }
}

exports.remove = async (req, res) => {
    try {
        res.json(await Category.findOneAndDelete({slug: req.params.slug}))
    } catch (err) {
        res.status(400).send('Category delete failed')
    }
}

exports.getSubs = (req, res) => {
    Sub.find({parent: req.params._id}).exec((err, subs) => {
        res.json(subs)
    })
}
