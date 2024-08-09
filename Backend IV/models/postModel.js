const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title:{
            type: 'String',
            required: true
        },
        body:{
            type: String,
            required: true
        },
        // have only id of liked posts 
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }],
        // have only id of commented posts 
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            lowercase: true, // convert comments as lowercase always
        }]
    }
)

module.exports = mongoose.model("Post", postSchema);