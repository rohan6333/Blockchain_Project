// src/backend/routes/credentialRoutes.js
const express = require('express');
const router = express.Router();
const credentialController = require('../controllers/credentialController');

// Define routes
router.post('/issue', credentialController.issueCredential);
router.get('/:holderAddress', credentialController.getCredentials);
router.post('/verify', credentialController.verifyCredential);

module.exports = router;
