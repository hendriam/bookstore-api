const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tag name is required'],
            minlength: [3, 'Length must be at least 3 characters'],
            maxlength: [100, 'Maximum length is 100 characters'],
        },
    },
    {
        timestamps: true,
    }
);

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
