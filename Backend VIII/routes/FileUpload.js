const express = require('express');
const router = express.Router();

const {imageUpload, videoUpload, imageReducerUpload, localFileUpload} = require('../controllers/fileUpload');

router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);
router.post('/imageReducerUpload', imageReducerUpload);
router.post('/localFileUpload', localFileUpload);

module.exports = router;