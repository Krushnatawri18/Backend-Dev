const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxLength: 30,
            required: true,
        },
        content: {
            type: String,
            maxLength: 200,
            required: true,
        },
        liked: {
            type: Boolean,
            required: true,
            default: false
        },
        comments: {
            type: String,
            maxLength: 30
        },
        createdAt:{
            type: Date,
            required: true,
            default: Date.now()
        },
        updatedAt:{
            type: Date,
            required: true,
            default: Date.now()
        }
    }
)

module.exports = mongoose.model("Blog", blogSchema);