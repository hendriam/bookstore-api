const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required'],
            unique: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: [true, 'Product is required'],
                },
                quantity: {
                    type: Number,
                    required: [true, 'Quantity is required'],
                    min: 1,
                },
                price: {
                    type: Number,
                },
                total: {
                    type: Number,
                },
            }
        ],
        totalQuantity: {
            type: Number,
            default: 0,
        },
        totalPrice: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Calculation of total price and quantity before saving
cartSchema.pre('save', function (next) {
    let totalQuantity = 0;
    let totalPrice = 0;

    this.items.forEach(item => {
        totalQuantity += item.quantity;
        totalPrice += item.total;
    });

    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;

    next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
