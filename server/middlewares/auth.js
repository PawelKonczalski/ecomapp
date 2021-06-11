const admin = require('../firebase')

exports.authCheck = async (req, res, next) => {
    try{
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

