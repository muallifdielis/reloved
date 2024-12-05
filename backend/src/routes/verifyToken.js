const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const ResponseAPI = require('../utils/response');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return ResponseAPI.unauthorized(res, 'Autentikasi diperlukan');
        }

        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.id; 
        next();
    } catch (error) {
        return ResponseAPI.unauthorized(res, 'Token tidak valid');
    }
};

const verifyHandler = (req, res) => {
    res.json({ message: 'Token valid', userId: req.userId });
};

module.exports = {
    verifyToken,
    verifyHandler
};