const Blog = require('../models/Blog');

exports.createPost = async (req, res) => {
    try {
        const { title, content, comments } = req.body;
        const response = await Blog.create({ title, content, comments });
        res.status(200).json({
            success: true,
            data: response,
            message: "Post created successfully"
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

exports.fetchPosts = async (req, res) => {
    try {
        const blogs = await Blog.find({});

        if (!blogs) {
            return res.status(200).json(
                {
                    success: true,
                    data: blogs,
                    message: "No posts fetched"
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                data: blogs,
                message: "All posts are fetched successfully"
            }
        )

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