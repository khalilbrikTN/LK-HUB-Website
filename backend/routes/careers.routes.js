const express = require('express');
const router = express.Router();
const careersController = require('../controllers/careers.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', careersController.getAllCareers);
router.get('/:id', careersController.getCareerById);

// Protected routes (Admin only)
router.post('/', verifyToken, careersController.createCareer);
router.put('/:id', verifyToken, careersController.updateCareer);
router.delete('/:id', verifyToken, careersController.deleteCareer);

module.exports = router;
