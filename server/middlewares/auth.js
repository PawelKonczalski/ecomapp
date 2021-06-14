const admin = require('../firebase')
const User = require('../models/user')

exports.authCheck = async (req, res, next) => {
    try {
        req.user = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
        next()
    } catch (err) {
        res.status(401).json({
            err: 'Invalid or expired token'
        })
    }
}

exports.adminCheck = async (req, res, next) => {
    const {email} = req.user
    const adminUser = await User.findOne({email}).exec()
    if (adminUser.role !== 'admin') {
        res.status(403).json({
            err: 'Admin resources. Access denied.'
        })
    } else {
        next()
    }
}