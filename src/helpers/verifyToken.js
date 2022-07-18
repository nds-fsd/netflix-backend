const express = require('express');
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;

// create verifyToken router
const verifyToken = express.Router();

// We should use this middleware to all /user methods unless get All users
verifyToken.use((request, response, next) => {
    const authHeader = request.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, jwtSecret, (error, payload) => {
            if (error) {
                return response.status(403).json({ mensaje: 'Invalid Token' });
            } else {
                request.payload = payload;
                next();
            }
        });
    } else {
        response.status(401).json({
            message: 'Token not provided.'
        });
    }
});
module.exports= {verifyToken};
