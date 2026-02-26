const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const upload = require('../middlewares/upload.middleware');
const { verifyToken } = require('../middlewares/auth.middleware');

// POST /api/upload
// The middleware `upload.single('file')` matches the Next.js `formData.get('file')` key.
router.post('/', verifyToken, upload.single('file'), uploadController.uploadFile);

module.exports = router;
