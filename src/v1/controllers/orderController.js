const orderService = require('../services/orderService')
const addressService = require('../services/addressService');
const responseSuccess = require('../../utils/response-success');

exports.getAllOrders = async (req, res, next) => {
    try {
        const order = await orderService.getAllOrder();
        responseSuccess(res, 'Order list successfully retrieved', order, 200);
    } catch (error) {
        next(error);
    }
}

exports.getOrderById = async (req, res, next) => {
    try {
        const user = req.user;
        const order = await orderService.getOrderById(user, req.params.id);
        responseSuccess(res, 'Order fetched successfully', order, 200);
    } catch (error) {
        next(error);
    }
}

exports.getOrdersByUserId = async (req, res, next) => {
    try {
        const user = req.user;
        const orders = await orderService.getOrdersByUserId(user);
        responseSuccess(res, 'Orders fetched successfully', orders, 200);
    } catch (error) {
        next(error);
    }
}

exports.order = async (req, res, next) => {
    try {
        const user = req.user;
        const shippingAddress = await addressService.getAllByUser(user.id)
        const shippingAddressId = shippingAddress.find(item => item['isDefault'] === true);
        const order = await orderService.order(user, shippingAddressId._id.toString());
        responseSuccess(res, 'Order created successfully', order, 201);
    } catch (error) {
        next(error);
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const order = await orderService.updateStatus(req.params.id, status);
        responseSuccess(res, 'Order status updated successfully', order, 200);
    } catch (error) {
        next(error);
    }
}