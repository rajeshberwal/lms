const Order = require("../models/order.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config.js");

// Order Controller
const createOrder = async (req, res) => {
    const userId = req.decoded.userId;

    const newOrder = new Order({
        uid: userId,
        products: req.body.products,
        total: req.body.total,
        price: req.body.price
    });
    try {
        const savedOrder = await newOrder.save();
        res.json(savedOrder);
    } catch (err) {
        res.json({ message: err });
    }
};

// Get User Info
const getUser = async (req, res) => {

    // middleware will set decoded if token is valid
    const userId = req.decoded.userId;

    const user = await User.findById(userId);
    // if user not found
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // if user found
    res.status(200).json({
        message: "User fetched successfully",
        user: user._id,
        role: user.role,
        name: user.name,
    });
}

// Get all orders
const getOrders = async (req, res) => {
    const userId = req.decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    const orders = await Order.find({ uid: userId });
    res.status(200).json({
        message: "Orders fetched successfully",
        orders: orders
    });
}



module.exports = {
    createOrder,
    getUser,
    getOrders
}