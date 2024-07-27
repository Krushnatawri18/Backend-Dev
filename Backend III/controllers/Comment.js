const Blog = require('../models/Blog');

exports.createComment = async (req, res) => {
    try {
        const id = req.params.id;
        const {comments} = req.body;
        const commentOfId = await Blog.findByIdAndUpdate(
            { _id: id },
            { comments, updatedAt: Date.now() },
        )

        res.status(200).json({
            success: true,
            data: commentOfId,
            message: "Created comment successfully"
        })
    }
    catch (err) {
        console.error(err);
        console.log(err.message);
        res.status(504).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.getComments = async (req, res) => {
    try {
        const allComments = await Blog.find({}).select('comments');

        res.status(200).json({
            success: true,
            data: allComments,
            message: "Fetched comments successfully"
        })
    }
    catch (err) {
        console.error(err);
        console.log(err.message);
        res.status(504).json({
            success: false,
            message: "Internal server error"
        })
    }
}