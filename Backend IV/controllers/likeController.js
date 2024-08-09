const Like = require('../models/likeModel');
const Post = require('../models/postModel');

exports.like = async(req, res) => {
    try{
        const {post, user} = req.body;
        const like = new Like({
            post, user
        });
        const savedLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new:true})
        .populate('likes')
        .exec();

        res.json({
            post: updatedPost
        })
    }
    catch(err){
        return res.status(504).json({
            error: "Internal server error"
        })
    }
};

exports.unlike = async(req, res) => {
    try{
        // fetching both post and like id's
        const {post, like} = req.body;
        // deleting like from like schema
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});

        // updating likes array in post schema
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}}, {new:true});

        res.json({
            post: updatedPost
        })
    }
    catch(err){
        return res.status(504).json({
            error: "Internal server error"
        })
    }
};