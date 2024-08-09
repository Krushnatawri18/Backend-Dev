const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

exports.createComment = async(req, res) => {
    try{
        const {post, user, body} = req.body;
        // creating new Comment object
        const comment = new Comment({
            post, user, body
        });
        // saving the new comment to Comment schema in db
        const savedComment = await comment.save();
        // now _id wil be created automatically in Comment schema in db

        // now adding id of comment into comment array of Post collection
        // finding Post collection by id and add new comment to its comment array
        // it will fetch by post i.e id in comment Schema and using $push operator that will update id of comments document of Post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new:true})
        .populate('comments') // populate will provide actual documet of comment with all content instead of only id
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

