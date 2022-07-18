const { expressjwt } = require('express-jwt');
const express = require('express');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
var bcrypt = require('bcryptjs');
const { User, generateJWT } = require('../mongo/schemas/user');
const { response } = require('express');

const authRouter = express.Router();

authRouter.post('/register', async (request, response) => {
    try {
        const emailExist = await User.findOne({ email: request.body.email })
        if (emailExist) {
            return response.status(400).json({
                error: "Email already exist"
            })
        }
        const user = new User(request.body);
        await user.save();
        const token = generateJWT(user);
        return response.status(201).json({
            token: token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                favs: user.favs
            }
        })
    }
    catch (err) {
        return response.status(500).json({
            error: err.message
        })
    }
});


authRouter.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).json({ message: 'User does not exist' })
        }
        const result = await user.comparePassword(password);
        if (!result) {
            return response.status(400).json({ message: 'Incorrect Password' });
        }
        const token = generateJWT(user);
        return response.status(200).json({
            token: token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                
            }
        })
    }
    catch (err) {
        return response.status(500).json({
            error: err.message
        })
    }
});



const jwtMW = (app) => {
    app.use('/', expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({
        path: ['/register', '/login'],
    }));
}


module.exports = { authRouter, jwtMW };
