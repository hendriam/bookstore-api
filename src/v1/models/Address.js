const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
    {
        recipientName: {
            type: String,
            required: [true, 'Recipient name is required'],
            minlength: [5, 'Length must be at least 5 characters'],
            maxlength: [50, 'Maximum length is 50 characters'],
        },
        streetAddress: {
            type: String,
            required: [true, 'Street Address is required'],
            minlength: [5, 'Length must be at least 5 characters'],
            maxlength: [500, 'Maximum length is 500 characters'],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            minlength: [3, 'Length must be at least 3 characters'],
            maxlength: [50, 'Maximum length is 50 characters'],
        },
        state: {
            type: String,
            required: [true, 'State is required'],
            minlength: [3, 'Length must be at least 3 characters'],
            maxlength: [50, 'Maximum length is 50 characters'],
        },
        postalCode: {
            type: String,
            required: [true, 'Postal Code is required'],
            minlength: [4, 'Length must be at least 4 characters'],
            maxlength: [10, 'Maximum length is 10 characters'],
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
            minlength: [3, 'Length must be at least 3 characters'],
            maxlength: [50, 'Maximum length is 50 characters'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone Number is required'],
            maxlength: [13, 'Maximum length is 13 characters'],
        },
        label: {
            type: String, // e.g., "home", "office"
            default: 'home',
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required'],
        },
    },
    {
        timestamps: true,
    }
);

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
