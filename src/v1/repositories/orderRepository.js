const Order = require('../models/Order');

exports.findAll = async () => {
    return await Order.find()
        .populate('user', 'fullname email role')
        .populate('items.product', 'name description image')
        .populate('shippingAddress');
};

exports.findById = async (orderId) => {
    return await Order.findById(orderId)
        .populate('user', 'fullname email role')
        .populate('items.product', 'name description image')
        .populate('shippingAddress');
};

exports.findByUserId = async (userId) => {
    return await Order.find({ user: userId })
        .populate('user', 'fullname email role')
        .populate('items.product', 'name description image')
        .populate('shippingAddress');
};

exports.save = async (orderData) => {
    const order = new Order(orderData);
    const saved = await order.save();
    return await Order.findById({ _id: saved._id })
        .populate('user', 'fullname email role')
        .populate('items.product', 'name description image')
        .populate('shippingAddress');
};

exports.updateStatus = async (orderId, status) => {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};
