const bcrypt = require('bcrypt');
const Person = require('../models/Person');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await Person.findOne({ email });

        // if user already exists
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User or Email id already exists'
            });
        }

        let hashedPassword;
        try {
            // taking password and performing 10 rounds of encryption (optimal) on password
            hashedPassword = await bcrypt.hash(password, 10);
        }
        // if couldn't done hashing
        catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password'
            });
        }

        // if successfully hashed password
        const person = await Person.create({
            name, email, password: hashedPassword, role
        });

        return res.status(200).json({
            success: true,
            data: person,
            message: 'User registered successfully'
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error in registering user'
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please, fill all the details'
            });
        }

        let person = await Person.findOne({ email });
        // if user is not registered
        if (!person) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered'
            });
        }

        // passing this payload with role so that we can authorize user by role
        const payload = {
            id: person._id,
            email: person.email,
            role: person.role
        };
        // comparing password with hashed password placed in db and generating JWT Token
        if (await bcrypt.compare(password, person.password)) {
            // passing payload which has 'role' that will help to authorize users as per role
            // creating jwt token
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    // time to get expire
                    expiresIn: '2h'
                }
            );

            // person = person.toObject(); // can be used to make person as object if person.token = token is not working
            // passing jwt token through person object to show to user in backend that user logged in successfully with message
            person.token = token; // find why need?
            // making password as undefined from person object so that hacker don't get password even if hacked that response
            // not made in actual db
            person.password = undefined;
            // console.log(token);

            const options = {
                // time to expire
                expires: new Date(Date.now() + 30000),
                // inaccessible to user
                httpOnly: true
            };
            // takes three params - name of cookie, cookie data, options
            // res.cookie('token', token, options).status(200).json({
            //     success: true,
            //     person,
            //     token,
            //     message: 'User logged in successfully'
            // });

            res.status(200).json({
                success: true,
                person,
                token,
                message: 'User logged in successfully'
            });
        }
        else {
            return res.status(403).json({
                success: false,
                message: 'Incorrect Password'
            });
        }
    }
    catch (err) {
        console.log(err);
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Error while Login'
        });
    }
};