const Order = require("../models/order.model");
const User = require("../models/user.model");

// isAdmin controller
const isAdmin = async (req, res) => {
    return res.status(200).json({
        role: "admin"
    });
};

// Get all orders
const getAllOrders = async (req, res) => {
    const orders = await Order.find();

    res.status(200).json({
        message: "Orders fetched successfully",
        orders: orders
    });
};

// Get order by id
const getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({
        message: "Order not found"
    });
    res.status(200).json({
        message: "Order fetched successfully",
        order: order
    });
};

// Edit Status of an Order
const editStauts = async (req, res) => {
    const order = await Order.findById(req.params.id);
    const status = req.body.status;
    
    // updating to new status
    order.status = req.body.status;
    order.save();

    // if status is inProgress, setTimeout to change status to washed after 2 hours
    if (status === "inProgress") {
        setTimeout(() => {
            order.status = "washed";
            order.save();
        }, 1000 * 60 * 60 * 2);
    }
};

// Delete order by id
const deleteOrder = async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({
        message: "Order not found"
    });
    res.status(200).json({
        message: "Order deleted successfully",
        order: order
    });
};

// Rxporting All Controllers
module.exports = {
    isAdmin,
    getAllOrders,
    getOrder,
    deleteOrder,
    editStauts
}