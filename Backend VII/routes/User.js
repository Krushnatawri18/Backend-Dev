const express = require('express');
const router = express.Router();

const { signup, login } = require('../controllers/Auth');
const {auth, isStudent, isAdmin} = require('../middlewares/auth');

router.post('/signup', signup);
router.post('/login', login);

router.get('/test', auth, (req, res) => {
    res.json({
        success: true,
        message: 'Tested protected router successfully'
    });
});

// Protected Routes
// when '/student' request triggers it checks for authentication with 'auth' middleware and then 'isStudent' middleware authorizes user by checking 'role' from the payload entity of token and then callback function will be called 
router.get('/student', auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: 'Student authorized successfully in its protected route'
    });
});

router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: 'Admin authorized successfully in its protected route'
    });
});

module.exports = router;