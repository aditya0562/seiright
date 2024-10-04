const express = require('express');
const { checkCompliance } = require('../controllers/complianceController');

const router = express.Router();

router.post('/check-compliance', checkCompliance);

module.exports = router;
