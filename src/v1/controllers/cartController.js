const cartService = require('../services/cartService')
const responseSuccess = require('../../utils/response-success');

exports.getCart = async (req, res, next) => {
    try {
        const user = req.user;
        const cart = await cartService.getCartByUserId(user);
        responseSuccess(res, 'Cart fetched successfully', cart, 200);
    } catch (error) {
        next(error);
    }
}

exports.addToCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        const cart = await cartService.addToCart(userId, productId, parseInt(quantity));
        responseSuccess(res, 'Product added to cart successfully', cart, 201);
    } catch (error) {
        next(error);
    }
}

exports.removeProductFromCart = async (req, res, next) => {
    try {
        const user = req.user;
        const itemId = req.params.itemId;
        const cart = await cartService.removeProductFromCart(user, itemId);
        responseSuccess(res, 'Product removed from cart successfully', cart, 200);
    } catch (error) {
        next(error);
    }
}

exports.clearCart = async (req, res, next) => {
    try {
        const user = req.user;
        const cart = await cartService.clearCart(user);
        responseSuccess(res, 'Cart cleared successfully', cart, 200);
    } catch (error) {
        next(error);
    }
}