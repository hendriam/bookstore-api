const orderRepository = require('../repositories/orderRepository')
const cartRepository = require('../repositories/cartRepository')
const productRepository = require('../repositories/productRepository')
const ResponseError = require('../../utils/response-error');
const defineAbilities = require('../../utils/defineAbilities');

exports.getAllOrder = async () => {
    return await orderRepository.findAll();
}

exports.getOrderById = async (user, orderId) => {
    const order = await orderRepository.findById(orderId);
    if (!order) {
        throw new ResponseError('Order not found', 404);
    }

    // Pastikan hanya pemilik order yang bisa mengaksesnya
    if (!order || order.user._id.toString() !== user.id.toString()) {
        throw new ResponseError('You do not have permission to get this order.', 403);
    }

    return order;
}

exports.getOrdersByUserId = async (user) => {
    const orders = await orderRepository.findByUserId(user.id);
    if (!orders) {
        throw new ResponseError('Orders not found', 404);
    }

    return orders;
}

exports.order = async (user, shippingAddressId) => {
    // Ambil cart berdasarkan userId
    const cart = await cartRepository.findCartByUserId(user.id);
    if (!cart || cart.items.length === 0) {
        throw new ResponseError('Cart is empty', 404);
    }

    // Validasi stok untuk setiap produk dalam cart
    for (const item of cart.items) {
        const product = await productRepository.findById(item.product._id);
        if (!product) {
            throw new ResponseError(`Product ${item.product.name} not found`, 404);
        }
        if (product.stock < item.quantity) {
            throw new ResponseError(`Stock for ${item.product.name} is insufficient`, 400);
        }
    }

    // Kurangi stok produk setelah validasi berhasil
    for (const item of cart.items) {
        const product = await productRepository.findById(item.product._id);
        product.stock -= item.quantity;
        await product.save();
    }

    // Membuat order
    const orderData = {
        user: user.id,
        items: cart.items.map(item => ({
            product: item.product,
            quantity: item.quantity,
            price: item.price,
        })),
        total: cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        shippingAddress: shippingAddressId,
        status: 'Pending',
    };

    const order = await orderRepository.save(orderData);

    await cartRepository.deleteCartByUserId(user.id);

    return order
}

exports.updateStatus = async (orderId, status) => {
    const order = await orderRepository.findById(orderId);
    if (!order) {
        throw new ResponseError('Order not found', 404);
    }

    return await orderRepository.updateStatus(order._id, status);
}