const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config.js');

// User Registration Controller
const registerUser = async(req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    // console.log(userData);
    await User.create(userData)
        .then(user => {
            res.status(201).json({
                message: 'User created successfully',
                user: user
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error creating user',
                error: err
            });
        });
};

// User Login Controller
const loginUser = async(req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    };

    await User.findOne({
            email: userData.email
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(userData.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        },
                        config.secret, {
                            expiresIn: config.jwtExpiration
                        }
                    );
                    // set header with httpOnly cookie
                    res.cookie('jwt', token, {
                        httpOnly: true
                    });

                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        role: user.role
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error logging in',
                error: err
            });
        });
};


module.exports = {
    registerUser,
    loginUser
};