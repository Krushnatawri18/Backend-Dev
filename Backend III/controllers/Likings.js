const Blog = require('../models/Blog');

exports.like = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findByIdAndUpdate(
            { _id: id },
            { liked: true, updatedAt: Date.now() },
            // make it return updated content
            { new: true }
        )

        res.status(200).json({
            success: true,
            data: blog,
            message: "Blog liked successfully"
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

exports.unlike = async (req, res) => {
    try {
        const id = req.params.id;
        const {liked} = req.body;
        const blog = await Blog.findByIdAndUpdate(
            { _id: id },
            { liked, updatedAt: Date.now() },
            { new: true }
        )

        res.status(200).json({
            success: true,
            data: blog,
            message: "Blog unliked successfully"
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