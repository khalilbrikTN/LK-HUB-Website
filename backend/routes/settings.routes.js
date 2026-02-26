const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Protected routes (Admin only)
router.get('/users', verifyToken, settingsController.getUsers);
router.post('/users', verifyToken, settingsController.createUser);
router.delete('/users/:id', verifyToken, settingsController.deleteUser);

module.exports = router;
