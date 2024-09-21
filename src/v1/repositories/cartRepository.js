const Cart = require('../models/Cart')

exports.findCartByUserId = async (userId) => {
    return await Cart.findOne({ user: userId }).populate('items.product', 'name description image');
}

exports.saveCart = async (cartData) => {
    const cart = new Cart(cartData);
    const saved = await cart.save();
    return await Cart.findOne({ user: saved.user }).populate('items.product', 'name description image');
}

exports.deleteCartByUserId = async (userId) => {
    return await Cart.findOneAndDelete({ user: userId });
}