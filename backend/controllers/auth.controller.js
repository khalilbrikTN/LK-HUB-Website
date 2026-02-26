const prisma = require('../config/db');
const jwt = require('jsonwebtoken');

// NOTE: Set this securely in your .env
const JWT_SECRET = process.env.JWT_SECRET || 'lkhub-super-secret-key-123';

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        // Querying User via Prisma
        // IMPORTANT: Right now comparing plain text. In future, we'll hash passwords.
        const user = await prisma.user.findFirst({
            where: { email, password, active: true },
        });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials or inactive account.' });
        }

        // Create JWT
        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            JWT_SECRET,
            { expiresIn: '12h' } // token lasts for 12 hours
        );

        res.status(200).json({
            success: true,
            token,
            user: { id: user.id, username: user.username, role: user.role }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
