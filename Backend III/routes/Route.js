const express = require('express');
const router = express.Router();

const {createPost, fetchPosts} = require('../controllers/Post');
const {like, unlike} = require('../controllers/Likings');
const {createComment, getComments} = require('../controllers/Comment');

router.post('/createPost', createPost);
router.get('/fetchPosts', fetchPosts);
router.put('/likings/like/:id', like);
router.put('/likings/unlike/:id', unlike);
router.post('/createComment/:id', createComment);
router.get('/getComments', getComments);

module.exports = router;