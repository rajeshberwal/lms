const router = require('express').Router();
const adminController = require('../controllers/admin.controller.js');
const dbConfig = require('../config/db.config.js');
const jwtMiddleware = require('../middlewares/auth.jwt.js');

// isAdmin route
router.get('/admin/isadmin', jwtMiddleware.tokenVerifyAdmin, adminController.isAdmin);

// Matches with "/api/admin/dashboard/orders"
router.get('/admin/dashboard/orders', jwtMiddleware.tokenVerifyAdmin, adminController.getAllOrders);

// Matches with "/api/admin/dashboard/orders/:id"
router.get('/admin/dashboard/orders/:id', jwtMiddleware.tokenVerifyAdmin, adminController.getOrder);

// Matches with "/api/admin/dashboard/edit/status/:id"
router.put('/admin/dashboard/edit/status/:id', jwtMiddleware.tokenVerifyAdmin, adminController.editStauts);

// Matches with "/api/admin/dashboard/delete/:id"
router.delete('/admin/dashboard/delete/:id', jwtMiddleware.tokenVerifyAdmin, adminController.deleteOrder);

module.exports = router;