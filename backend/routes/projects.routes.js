const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', projectsController.getAllProjects);
router.get('/:id', projectsController.getProjectById);

// Protected routes (Admin only)
router.post('/', verifyToken, projectsController.createProject);
router.put('/:id', verifyToken, projectsController.updateProject);
router.delete('/:id', verifyToken, projectsController.deleteProject);

module.exports = router;
