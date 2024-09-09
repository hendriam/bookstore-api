const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            minlength: [3, 'Length must be at least 3 characters'],
            maxlength: [100, 'Maximum length is 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            maxlength: [500, 'Maximum length is 500 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            cast: 'Product price must be a number',
        },
        image: {
            type: String,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required'],
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
