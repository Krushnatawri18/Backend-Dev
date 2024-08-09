const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
    {
        post:{
            // providing the id of object or schema you want to refer
            type: mongoose.Schema.Types.ObjectId,
            // referring to the Post model
            ref: "Post" 
        },
        user: {
            type: String,
            required: true,
        }
    }
)

module.exports = mongoose.model("Like", likeSchema);