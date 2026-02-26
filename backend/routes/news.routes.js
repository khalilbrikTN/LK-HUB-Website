const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', newsController.getAllNews);

// Protected routes (Admin only)
router.post('/', verifyToken, newsController.createNews);
router.put('/:id', verifyToken, newsController.updateNews);
router.patch('/:id/visibility', verifyToken, newsController.toggleNewsVisibility);
router.delete('/:id', verifyToken, newsController.deleteNews);

module.exports = router;
