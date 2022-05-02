const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config.js');
const User = require('../models/user.model.js');

const { TokenExpiredError } = jwt;


const tokenVerify = (req, res, next) => {
    // const token = req.headers['x-access-token'];
    const token = req.headers['authorization'].split(' ')[1];

    // if token is not present
    if (!token) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }

    // verify token
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            return res.status(401).json({
                message: 'Auth failed'
            });
        }

        // setting decoded to req
        req.decoded = decoded;
        next();
    });
}

const tokenVerifyAdmin = (req, res, next) => {
    // const token = req.headers['x-access-token'];
    // get token from authorization header
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            return res.status(401).json({
                message: 'Auth failed'
            });
        }

        // get role from uid
        User.findById(decoded.userId, (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: 'Auth failed'
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'Auth failed'
                });
            }

            // check if user is admin
            if (user.role === 'admin') {
                next();
            } else {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
        });

    });
}

module.exports = {
    tokenVerify,
    tokenVerifyAdmin
}