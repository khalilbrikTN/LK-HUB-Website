const prisma = require('../config/db');

// --- READ ALL CAREERS ---
exports.getAllCareers = async (req, res) => {
    try {
        const careers = await prisma.career.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json({ success: true, data: careers });
    } catch (error) {
        console.error("Error fetching careers:", error);
        res.status(500).json({ success: false, message: 'Server Error fetching careers.' });
    }
};

// --- READ SINGLE CAREER ---
exports.getCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const career = await prisma.career.findUnique({ where: { id } });

        if (!career) {
            return res.status(404).json({ success: false, message: 'Career not found.' });
        }

        res.status(200).json({ success: true, data: career });
    } catch (error) {
        console.error("Error fetching career:", error);
        res.status(500).json({ success: false, message: 'Server Error fetching career.' });
    }
};

// --- CREATE CAREER ---
exports.createCareer = async (req, res) => {
    try {
        const { title, location, type, department, status, date_posted } = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: 'Career title is required.' });
        }

        const newCareer = await prisma.career.create({
            data: {
                title,
                location: location || 'Cairo, Egypt',
                type: type || 'Full-time',
                department: department || 'General',
                applicants: 0,
                status: status || 'Active',
                date_posted: date_posted || new Date().toISOString().split('T')[0],
            },
        });

        res.status(201).json({ success: true, message: 'Career created successfully!', data: newCareer });
    } catch (error) {
        console.error("Error creating career:", error);
        res.status(500).json({ success: false, message: 'Failed to create career.' });
    }
};

// --- UPDATE CAREER ---
exports.updateCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, location, type, department, status } = req.body;

        const updatedCareer = await prisma.career.update({
            where: { id },
            data: {
                title,
                location,
                type,
                department,
                status,
            },
        });

        res.status(200).json({ success: true, message: 'Career updated successfully!', data: updatedCareer });
    } catch (error) {
        console.error("Error updating career:", error);
        res.status(500).json({ success: false, message: 'Failed to update career.' });
    }
};

// --- DELETE CAREER ---
exports.deleteCareer = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.career.delete({ where: { id } });
        res.status(200).json({ success: true, message: 'Career deleted successfully!' });
    } catch (error) {
        console.error("Error deleting career:", error);
        res.status(500).json({ success: false, message: 'Failed to delete career.' });
    }
};
