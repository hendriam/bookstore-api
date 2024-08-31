const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Tag name is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Tag = mongoose.model("tags", tagSchema);

module.exports = Tag;
