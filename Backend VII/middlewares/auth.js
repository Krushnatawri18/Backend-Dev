// making authentication, authorization for student and admin through role

const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authentication

// next redirects the route to next middleware that to be called
exports.auth = (req, res, next) => {
    try {
        // fetching jwt token from req.body
        // can be fetched from either cookies or jwt header
        console.log('body', req.body.token);
        console.log('cookies', req.cookies.token);
        console.log('header', req.header('Authorization'));
        const token = req.body.token || req.cookies.token || req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing'
            });
        }

        try {
            // authorizing by verifying the token
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            //   Payload : {
            //      id: '66b1eb95f22a64dfacfba152',
            //      email: 'madhav@gmail.com',
            //      role: 'Visitor',
            //      iat: 1722945117,
            //      exp: 1722952317
            //   }

            // adding payload of decode data in request so that in future we can verify user based on 'role' which is in jwt
            // as we are not getting role while login so to check role we need to add payload into person through request
            req.person = payload;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while verifying token'
        });
    }
}

// Authorization

// no need to send success response as we are sending through callback function in routes
exports.isStudent = (req, res, next) => {
    try {
        // authorizing user as 'Student' by taking role from payload of request
        if (req.person.role !== 'Student') {
            return res.status(401).json({
                success: false,
                message: "Protected route for students"
            });
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'User role is not matching'
        });
    }
}

// no need to send success response as we are sending through callback function in routes
exports.isAdmin = (req, res, next) => {
    try {
        // authorizing user as 'Student' by taking role from payload of request
        if (req.person.role !== 'Admin') {
            return res.status(401).json({
                success: false,
                message: "Protected route for admin"
            });
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'User role is not matching'
        });
    }
}