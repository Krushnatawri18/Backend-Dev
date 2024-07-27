const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxLength: 20,
            required: true
        },
        description: {
            type: String,
            maxLength: 40,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
            required: true
        }
    }
);

// exported as name 'Todo'
module.exports = mongoose.model("Todo", todoSchema);
