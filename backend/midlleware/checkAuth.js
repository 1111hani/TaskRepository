const jwt = require('jsonwebtoken')
const User = require('../models/userM')

const checkAuth = (req, res, next) => {
    console.log('middleware');
    jwt.verify(req.headers['authorization'], process.env.SECRET, function (err, decoded) {
        if (err|| !decoded)
            return res.status(400).send('not allow!!')
        User.findById(decoded._id)
        .then(() => {
            next()
        })
            .catch(err => {
                console.log('midd not found');
                res.status(400).send('not allow!!')
            })


    })
}

module.exports = checkAuth