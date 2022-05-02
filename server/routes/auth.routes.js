const router = require('express').Router();
const userController = require('../controllers/auth.controller.js');
const dbConfig = require('../config/db.config.js');

// Matches with "/api/register"
router.post('/register', userController.registerUser);

// Matches with "/api/login"
router.post('/login', userController.loginUser);

module.exports = router;