const express = require('express');
const router = express.Router();

const {createComment} = require('../controllers/CommentController');
const { createPost, getPosts } = require('../controllers/PostController');
const { like, unlike } = require('../controllers/LikeController');

router.post('/create', createComment);
router.post('/createPost', createPost);
router.get('/getPosts', getPosts);
router.post('/likes/like', like);
router.post('/likes/unlike', unlike);

module.exports = router;