const router = require('express').Router();
const userController = require('../controllers/user.controller.js');
const dbConfig = require('../config/db.config.js');
const jwtMiddleware = require('../middlewares/auth.jwt.js');

// Matches with "/api/:id/orders"
router.post('/user/create/order', jwtMiddleware.tokenVerify, userController.createOrder);

// Matches with "/api/user"
router.get('/user', jwtMiddleware.tokenVerify, userController.getUser);

// Matches with "/api/user/orders"
router.get('/user/orders', jwtMiddleware.tokenVerify, userController.getOrders);

module.exports = router;