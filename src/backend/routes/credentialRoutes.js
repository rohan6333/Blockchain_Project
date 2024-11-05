const express = require('express');
const router = express.Router();
const credentialController = require('../controllers/credentialController');

router.post('/set', credentialController.setValue);
router.get('/get', credentialController.getValue);

module.exports = router;
