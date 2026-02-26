const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'lkhub-super-secret-key-123';

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // attaching decoded token payload to req object
        next(); // Proceed to controller
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};
