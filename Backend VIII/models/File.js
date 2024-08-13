const mongoose = require('mongoose');
const sendMailOnSave = require('../config/emailMiddleware');

const fileSchema = new mongoose.Schema(
    {
        name: {
            type: 'String',
            required: true,
        },
        imageUrl: {
            type: 'String',
        },
        tags: {
            type: 'String',
        },
        email: {
            type: 'String',
        },
    }
)

// post middleware
fileSchema.post('save', sendMailOnSave);

const File = mongoose.model('File', fileSchema);
module.exports = File;