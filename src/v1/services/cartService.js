const Cart = require('../models/Cart')
const cartRepository = require('../repositories/cartRepository')
const productRepository = require('../repositories/productRepository');
const defineAbilities = require('../../utils/defineAbilities');
const ResponseError = require('../../utils/response-error');

exports.addToCart = async (userId, productId, quantity) => {
    // Product Validation
    const product = await productRepository.findById(productId);
    if (!product) {
        throw new ResponseError('Product not found', 404);
    }

    // Check User Cart
    let cart = await cartRepository.findCartByUserId(userId);
    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

    if (itemIndex > -1) {
        // If the product is already in the cart, update the quantity and total
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].total = cart.items[itemIndex].quantity * cart.items[itemIndex].price;
    } else {
        // If the product does not exist, add a new product to the cart.
        cart.items.push({
            product: productId,
            quantity: quantity,
            price: product.price,
            total: quantity * product.price
        });
    }
    // Save Cart
    return await cartRepository.saveCart(cart);
}

exports.getCartByUserId = async (user) => {
    const cart = await cartRepository.findCartByUserId(user.id);
    if (!cart) {
        throw new ResponseError('Cart not found', 404);
    }

    const ability = defineAbilities(user);
    if (!ability.can('read', cart)) {
        throw new ResponseError('You do not have permission to read this cart.', 403);
    }

    return cart
}

exports.removeProductFromCart = async (user, itemId) => {
    const cart = await cartRepository.findCartByUserId(user.id);
    if (!cart) {
        throw new ResponseError('Cart not found', 404);
    }

    const ability = defineAbilities(user);
    if (!ability.can('delete', cart)) {
        throw new ResponseError('You do not have permission to deleted item in this cart.', 403);
    }

    // Find the index of the item you want to delete based on itemId
    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
        throw new ResponseError('Item not found in cart', 404);
    }

    // Remove product from cart (splice removes item from array)
    cart.items.splice(itemIndex, 1);

    // Save cart changes
    return await cartRepository.saveCart(cart);
}

exports.clearCart = async (user) => {
    const cart = await cartRepository.findCartByUserId(user.id);
    if (!cart) {
        throw new ResponseError('Cart not found', 404);
    }

    const ability = defineAbilities(user);
    if (!ability.can('delete', cart)) {
        throw new ResponseError('You do not have permission to clear this cart.', 403);
    }

    return await cartRepository.deleteCartByUserId(user.id);
}