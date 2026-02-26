const prisma = require('../config/db');

// --- GET ALL USERS ---
exports.getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        // No longer returning passwords manually; `select` actively blocks it via Prisma natively.
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error reading users:", error);
        res.status(500).json({ success: false, message: 'Server Error fetching users.' });
    }
};

// --- CREATE USER ---
exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: 'Missing required user fields.' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }

        // IMPORTANT NOTE: When implementing robust flow, insert `bcryptjs.hash()` here.
        // Currently keeping the plain text storage parity with Next.js action per the codebase.
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password, // TODO: Replace with hashed password
                role: 'Admin',
                active: true,
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });

        res.status(201).json({ success: true, message: 'User created successfully!', data: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: 'Failed to create user.' });
    }
};

// --- DELETE USER ---
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        if (user.role === 'Super Admin') {
            return res.status(403).json({ success: false, message: 'Cannot delete Super Admin.' });
        }

        // Optional check: Prevent users from deleting themselves 
        if (req.user && req.user.id === id) {
            return res.status(403).json({ success: false, message: 'You cannot delete your own account.' });
        }

        await prisma.user.delete({ where: { id } });
        res.status(200).json({ success: true, message: 'User deleted successfully!' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: 'Failed to delete user.' });
    }
};
