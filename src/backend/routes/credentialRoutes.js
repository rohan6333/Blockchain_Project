const express = require('express');
const router = express.Router();
const credentialController = require('../controllers/credentialController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
router.post(
  '/issue-manual',
  authMiddleware.authorize('issuer'),
  credentialController.issueCredentialManual
);
router.post(
  '/bulk-issue',
  authMiddleware.authorize('issuer'),
  upload.single('file'),
  credentialController.bulkIssueCredential
);
router.get(
  '/:holderAddress',
  authMiddleware.authorize(['issuer', 'holder', 'checker']),
  credentialController.getCredentials
);
router.post(
  '/verify',
  authMiddleware.authorize(['issuer', 'holder', 'checker']),
  credentialController.verifyCredential
);
module.exports = router;
