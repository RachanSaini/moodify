const jwt = require('jsonwebtoken');
const config = require('../config')

// check if Token exists on request Header and attach token to request as attribute
exports.checkTokenMW = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1];
        next();
    } else {
        res.sendStatus(403);
    }
};

// Verify Token validity and attach token data as request attribute
exports.verifyToken = (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            return req.authData = authData;
        }
    })
};

// Issue Token
exports.signToken = (req, res) => {
    jwt.sign({data: req.user}, 'secretkey', {expiresIn:'1440 min'}, (err, token) => {
        if(err){
            res.sendStatus(500);
        } else {
            res.redirect(`${config.FRONTEND_URL}/#/login?token=${token}`)
        }
    });
}