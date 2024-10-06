const jwt = require('jsonwebtoken');
const User = require('../models/User');
/*
const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: "Failed to authenticate token" });
        req.user = decoded;
        next();
    });
};

module.exports = auth;*/

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token and extract the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach the decoded user object to the request
        next();  // Continue to the next middleware or controller
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
