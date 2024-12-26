// routes/contactRoutes.js
const express = require('express');
const { sendContactEmail } = require('../controllers/contactController');

const router = express.Router();

// Định nghĩa route gửi email
router.post('/send-email', sendContactEmail);

module.exports = router;
